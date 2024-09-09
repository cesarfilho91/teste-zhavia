import { useEffect } from 'react';
import io from 'socket.io-client';

const socketURL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

if (!socketURL) {
  throw new Error('A URL do WebSocket não está definida no arquivo .env');
}

const socket = io(socketURL);

const useSocket = () => {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;