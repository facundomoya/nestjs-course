import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagesWsService } from "./messages-ws.service";
import { Server, Socket } from "socket.io";
import { NewMessageDto } from "./dto/new-message.dto";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { JwtPayload } from "../auth/interfaces/jwt-payload.interface";

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    constructor(private readonly messagesWsService: MessagesWsService,
        private readonly jwtService: JwtService
    ) {}

    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authentication as string;
        let payload: JwtPayload;
        try{
            payload = this.jwtService.verify(token);
            await this.messagesWsService.registerClient(client, payload.id);
            console.log({ payload });
        } catch (error) {
            console.error({ error });
            client.disconnect();
            return;
        }
        console.log({payload})
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    handleDisconnect(client: Socket) {
        this.messagesWsService.removeClient(client.id);
        console.log({ connectedClients: this.messagesWsService.getConnectedClients() });
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    @SubscribeMessage('message-from-client')
    onMessageFromClient(client: Socket, payload: NewMessageDto) {
        const fullName = this.messagesWsService.getUserFullName(client.id);

        client.broadcast.emit('message-from-server', {
            fullName,
            message: payload.message
        });

        client.emit('message-from-server', {
            fullName,
            message: payload.message
        });
    }

}