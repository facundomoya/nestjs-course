import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagesWsService } from "./messages-ws.service";
import { Server, Socket } from "socket.io";
import { NewMessageDto } from "./dto/new-message.dto";

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    constructor(private readonly messagesWsService: MessagesWsService) {}
    handleConnection(client: Socket) {
        const token = client.handshake.headers.authentication as string;
        console.log({ token });
        this.messagesWsService.registerClient(client);
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    handleDisconnect(client: Socket) {
        this.messagesWsService.removeClient(client.id);
        console.log({ connectedClients: this.messagesWsService.getConnectedClients() });
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    @SubscribeMessage('message-from-client')
    onMessageFromClient(client: Socket, payload: NewMessageDto) {
       //emit only to the client that sent the message
/*         client.emit('message-from-server', {
            fullName: 'John Doe',
            message: payload.message
        }); */
        //emit to all clients except the one that sent the message
        client.broadcast.emit('message-from-server', {
            fullName: 'John Doe',
            message: payload.message
        });
        //emit to all clients including the one that sent the message
/*         this.wss.emit('message-from-server', {
            fullName: 'John Doe',
            message: payload.message
        }); */
    }

}