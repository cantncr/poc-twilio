import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { DeleteMessageDTO, SendMessageDTO } from 'src/dto/message.dto';
import MessageService from '../services/message.service';

@Controller('/message')
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('/send')
  async sendMessage(@Body() messageDto: SendMessageDTO): Promise<any> {
    return await this.messageService.sendMessage(messageDto);
  }
  @Get('/list/:conversationId')
  async listMessages(
    @Param('conversationId') conversationId: string,
  ): Promise<any> {
    return await this.messageService.listMessages(conversationId);
  }

  @Delete('/delete')
  async deleteMessage(@Body() messageDto: DeleteMessageDTO): Promise<boolean> {
    return await this.messageService.deleteMessage(messageDto);
  }
}
