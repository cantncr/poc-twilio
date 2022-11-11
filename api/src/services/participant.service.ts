import { Injectable } from '@nestjs/common';
import {
  CreateParticipantDTO,
  DeleteParticipantDTO,
  GenerateTokenDTO,
} from '../dto/participant.dto';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/conversation/participant';
import { TwilioAccount } from '../twilio_account';
import ConversationService from './conversation.service';

import { jwt } from 'twilio';

const AccessToken = jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

@Injectable()
export default class ParticipantService {
  private client = TwilioAccount.getClient();
  private readonly conversationService: ConversationService =
    new ConversationService();

  public createParticipant = async (
    participantDto: CreateParticipantDTO,
  ): Promise<ParticipantInstance> => {
    return await this.client.conversations.v1
      .conversations(`${participantDto.conversationId}`)
      .participants.create({ identity: `${participantDto.identity}` });
  };

  public generateToken = async (
    conversationId: string,
    participantId: string,
  ): Promise<GenerateTokenDTO> => {
    const conversation = await this.conversationService.getConversation(
      conversationId,
    );

    const participants = await this.listParticipants(conversationId);

    const participant = participants.find(
      (participant) => participant.sid == participantId,
    );

    const chatServiceId = conversation.chatServiceSid;

    const chatGrant = new ChatGrant({ serviceSid: chatServiceId });

    const token = new AccessToken(
      process.env.SERVICE_TWILIO_ACCOUNT_SID,
      process.env.SERVICE_TWILIO_API_KEY,
      process.env.SERVICE_TWILIO_API_KEY_SECRET,
      {
        identity: participant.identity,
      },
    );

    token.addGrant(chatGrant);

    return { token: token.toJwt() };
  };

  public deleteParticipant = async (
    participantDto: DeleteParticipantDTO,
  ): Promise<boolean> => {
    return await this.client.conversations.v1
      .conversations(`${participantDto.conversationId}`)
      .participants(`${participantDto.id}`)
      .remove();
  };

  public listParticipants = async (
    conversationId: string,
  ): Promise<ParticipantInstance[]> => {
    return await this.client.conversations.v1
      .conversations(`${conversationId}`)
      .participants.list();
  };
}
