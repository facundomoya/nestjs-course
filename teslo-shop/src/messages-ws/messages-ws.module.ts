import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, AuthModule],
  providers: [MessagesWsGateway, MessagesWsService],
})
export class MessagesWsModule {}
