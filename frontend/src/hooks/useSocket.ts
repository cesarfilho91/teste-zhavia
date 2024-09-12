import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketURL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

if (!socketURL) {
  throw new Error('A URL do WebSocket não está definida no arquivo .env');
}

const useSocket = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io(socketURL, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!socket) {
    return { socket: null, loading: true };
  }

  return { socket, loading: false };
};

export default useSocket;