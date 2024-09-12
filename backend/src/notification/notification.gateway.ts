import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    //console.log('WebSocket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    //console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    //console.log('Client disconnected:', client.id);
  }

  notifyAll(type: string, data: any) {
    this.server.emit('notification', { type, data });
  }
}