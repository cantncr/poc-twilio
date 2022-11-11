import { Injectable } from '@nestjs/common';
import { TwilioAccount } from '../twilio_account';
import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import { CreateConversationBody } from '../dto/conversation.dto';

@Injectable()
export default class ConversationService {
  private client = TwilioAccount.getClient();

  public createConversation = async (
    createConversationBody: CreateConversationBody,
  ): Promise<string> => {
    const conversation =
      await this.client.conversations.v1.conversations.create({
        friendlyName: createConversationBody.topicName,
      });

    return conversation.sid;
  };

  public getConversations = async (): Promise<ConversationInstance[]> => {
    return await this.client.conversations.v1.conversations.list({
      limit: 20,
    });
  };

  public deleteConversation = async (
    conversationId: string,
  ): Promise<boolean> => {
    return await this.client.conversations.v1
      .conversations(`${conversationId}`)
      .remove();
  };

  public getConversation = async (
    conversationId: string,
  ): Promise<ConversationInstance> => {
    return await this.client.conversations.v1
      .conversations(`${conversationId}`)
      .fetch();
  };
}
