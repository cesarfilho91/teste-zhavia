import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push('/tasks');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.'); 
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Head>
        <title>Login - Teste Zhavia</title>
        <meta name="description" content="Página de login do sistema de gerenciamento de tarefas." />
      </Head>
      <div className="container mt-5">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setError(null)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setError(null)} 
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
            {loading ? <span>Carregando...</span> : <span>Login</span>}
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
        <p className="mt-3 text-center">
          Não possui cadastro? <Link href="/register">Cadastre-se já</Link>
        </p>
      </div>
    </>
  );
}