import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import WebSocket, {Server} from 'ws';
import {from, map, Observable} from 'rxjs';

@WebSocketGateway(8032)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private readonly logger: Logger = new Logger('ChatGateway');

  users: number = 0;

  afterInit() {
    this.logger.log('WebSocket initialized');
  }

  async handleConnection() {
    this.users++;
  }

  async handleDisconnect() {
    this.users--;
  }

  @SubscribeMessage('msgToServer')
  msgToServer(client: WebSocket): Observable<WsResponse<number>> {
    this.logger.log('protocol', client.protocol);
    return from([1, 2, 3]).pipe(map(item => ({event: 'msgToClient', data: item})));
  }
}
