import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

const OnlineUsersList = () => {
  const { socket, loading } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && socket) {
      socket.on('onlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('onlineUsers');
      };
    }
  }, [socket, loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="containe-fluid mt-4">
      <hr/>
      <h3 className="text-left mb-2 mt-2">Usuários Online</h3>
      <ul className="list-group">
        {onlineUsers.length > 0 ? (
          onlineUsers.map((userId) => (
            <li key={userId} className="list-group-item">
              {userId}
            </li>
          ))
        ) : (
          <li className="list-group-item">Nenhum usuário online</li>
        )}
      </ul>
    </div>
  );
};

export default OnlineUsersList;