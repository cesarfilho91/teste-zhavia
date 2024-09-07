const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

socket.onopen = () => {
  console.log('WebSocket conexão estabelecida.');
};

socket.onclose = () => {
  console.log('WebSocket conexão fechada.');
};

socket.onerror = (error) => {
  console.error('WebSocket erro:', error);
};

export default socket;