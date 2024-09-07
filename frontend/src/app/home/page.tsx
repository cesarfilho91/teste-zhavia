"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/tasks');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={`container ${styles.homeContainer}`}>
      <h1 className="text-center mt-5">Bem-vindo ao Gerenciador de Tarefas</h1>
      <p className="text-center mt-3">
        Você será redirecionado automaticamente para a página de tarefas se estiver autenticado, ou para a página de login se não estiver.
      </p>
    </div>
  );
}