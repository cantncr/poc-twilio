import { Injectable } from '@nestjs/common';
import { MessageInstance } from 'twilio/lib/rest/conversations/v1/conversation/message';
import { DeleteMessageDTO, SendMessageDTO } from '../dto/message.dto';
import { TwilioAccount } from '../twilio_account';

@Injectable()
export default class MessageService {
  private client = TwilioAccount.getClient();

  public sendMessage = async (
    messageDto: SendMessageDTO,
  ): Promise<MessageInstance> => {
    return await this.client.conversations.v1
      .conversations(`${messageDto.conversationId}`)
      .messages.create({
        author: `${messageDto.author}`,
        body: `${messageDto.message}`,
      });
  };

  public listMessages = async (
    conversationId: string,
  ): Promise<MessageInstance[]> => {
    return await this.client.conversations.v1
      .conversations(`${conversationId}`)
      .messages.list({ limit: 20 });
  };

  public deleteMessage = async (
    messageDto: DeleteMessageDTO,
  ): Promise<boolean> => {
    return await this.client.conversations.v1
      .conversations(`${messageDto.conversationId}`)
      .messages(`${messageDto.messageId}`)
      .remove();
  };
}
