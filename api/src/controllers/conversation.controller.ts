import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import ConversationService from '../services/conversation.service';
import { CreateConversationBody } from '../dto/conversation.dto';

@Controller('/conversations')
export default class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('/')
  async createConversation(
    @Body() createConversationBody: CreateConversationBody,
  ): Promise<string> {
    return await this.conversationService.createConversation(
      createConversationBody,
    );
  }

  @Get('/')
  async getConversations(): Promise<ConversationInstance[]> {
    return await this.conversationService.getConversations();
  }

  @Delete('/:conversationId')
  async deleteConversation(
    @Param('conversationId') conversationId: string,
  ): Promise<boolean> {
    return await this.conversationService.deleteConversation(conversationId);
  }

  @Get('/:conversationId')
  async getConversationByID(
    @Param('conversationId') conversationId: string,
  ): Promise<ConversationInstance> {
    return await this.conversationService.getConversation(conversationId);
  }
}
