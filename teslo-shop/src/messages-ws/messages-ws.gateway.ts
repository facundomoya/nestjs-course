import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagesWsService } from "./messages-ws.service";
import { Server, Socket } from "socket.io";
import { NewMessageDto } from "./dto/new-message.dto";

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    constructor(private readonly messagesWsService: MessagesWsService) {}
    handleConnection(client: Socket) {
        this.messagesWsService.registerClient(client);
        console.log({ connectedClients: this.messagesWsService.getConnectedClients() });
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    handleDisconnect(client: Socket) {
        this.messagesWsService.removeClient(client.id);
        console.log({ connectedClients: this.messagesWsService.getConnectedClients() });
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    @SubscribeMessage('message')
    onMessageFromClient(client: Socket, payload: NewMessageDto) {
        console.log('Message received from client:', client.id, payload);
    }

}