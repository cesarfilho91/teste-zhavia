import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export const useSocket = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    socket.on('notification', (message: string) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const sendNotification = (message: string) => {
    socket.emit('sendNotification', message);
  };

  return { notifications, sendNotification };
};
