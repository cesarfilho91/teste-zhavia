import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTaskModal from './CreateTaskModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import useSocket from '../../hooks/useSocket';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { socket, loading } = useSocket(); 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchTasks();
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (loading || !socket) return;
  
    socket.on('notification', (message: { type: string; data: Task }) => {
      switch (message.type) {
        case 'NEW_TASK':
          toast.success(`Nova tarefa criada: ${message.data.title}`);
          setTasks((prevTasks) => [...prevTasks, message.data]);
          break;
        case 'TASK_UPDATED':
          toast.info(`Tarefa atualizada: ${message.data.title}`);
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === message.data.id ? message.data : task))
          );
          break;
        case 'TASK_DELETED':
          toast.error(`Tarefa excluída: ${message.data.title}`);
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== message.data.id));
          break;
        default:
          console.warn('Tipo de mensagem desconhecido:', message.type);
      }
    });
  
    return () => {
      socket.off('notification');
    };
  }, [socket, loading]);  

  async function fetchTasks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleLogout() {
    logout();
    router.push('/login');
  }

  async function handleDelete(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  }

  async function handleEditStatus(id: string, newStatus: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setEditingTask(null);
    fetchTasks();
  }

  function getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'table-light';
      case 'em progresso':
        return 'table-primary';
      case 'concluido':
        return 'table-success';
      case 'cancelado':
        return 'table-danger';
      default:
        return '';
    }
  }

  if (!isAuthenticated) {
    return <div>Redirecionando...</div>;
  }

  return (
    <>
      <Head>
        <title>Tarefas - Teste Zhavia</title>
        <meta name="description" content="Página de tarefas do sistema de gerenciamento de tarefas." />
      </Head>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Tarefas</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <button className="btn btn-primary mb-3" onClick={openModal}>
          Criar Nova Tarefa
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan={2}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={getStatusClass(task.status)}>
                <th scope="row">{task.id}</th>
                <td>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</td>
                <td>{task.description}</td>
                <td>
                  {editingTask?.id === task.id ? (
                    <select
                      value={editingTask.status}
                      onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                      className="form-select"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em progresso">Em Progresso</option>
                      <option value="concluido">Concluído</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  ) : (
                    task.status.charAt(0).toUpperCase() + task.status.slice(1)
                  )}
                </td>
                <td>
                  {editingTask?.id === task.id ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleEditStatus(task.id, editingTask.status)}
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => setEditingTask(task)}
                    >
                      Editar
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(task.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateTaskModal show={showModal} handleClose={closeModal} fetchTasks={fetchTasks} />
      
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
}