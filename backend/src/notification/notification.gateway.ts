import { 
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers: Set<string> = new Set();

  handleConnection(client: Socket): void {
    //console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    //console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('userLogin')
  handleUserLogin(client: Socket, payload: { userId: string }): void {
    this.onlineUsers.add(payload.userId);
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage('userLogout')
  handleUserLogout(client: Socket, payload: { userId: string }): void {
    this.onlineUsers.delete(payload.userId);
    this.broadcastOnlineUsers();
  }

  broadcastOnlineUsers() {
    this.server.emit('onlineUsers', Array.from(this.onlineUsers));
  }
}