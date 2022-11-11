import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConversationService from './services/conversation.service';
import MessageService from './services/message.service';
import ConversationController from './controllers/conversation.controller';
import ParticipantController from './controllers/participant.controller';
import ParticipantService from './services/participant.service';
import MessageController from './controllers/message.controller';
import MediaService from './services/media.service';
import MediaController from './controllers/media.controller';
import ConfigurationController from './controllers/configuration.controller';
import ConfigurationService from './services/configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    ConversationController,
    ConfigurationController,
    ParticipantController,
    MessageController,
    MediaController,
  ],
  providers: [
    ConfigService,
    ConversationService,
    ConfigurationService,
    MessageService,
    ParticipantService,
    MessageService,
    MediaService,
  ],
})
export class AppModule {}
