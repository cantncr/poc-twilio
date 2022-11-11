import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  CreateParticipantDTO,
  DeleteParticipantDTO,
  GenerateTokenDTO,
} from '../dto/participant.dto';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/conversation/participant';
import ParticipantService from '../services/participant.service';

@Controller('/participants')
export default class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get(':conversationId')
  async listParticipants(
    @Param('conversationId') conversationId: string,
  ): Promise<ParticipantInstance[]> {
    return await this.participantService.listParticipants(conversationId);
  }

  @Get(':conversationId/:participantId')
  async generateToken(
    @Param('conversationId') conversationId: string,
    @Param('participantId') participantId: string,
  ): Promise<GenerateTokenDTO> {
    return await this.participantService.generateToken(
      conversationId,
      participantId,
    );
  }

  @Post('/add')
  async createParticipant(
    @Body() createParticipantDTO: CreateParticipantDTO,
  ): Promise<ParticipantInstance> {
    return await this.participantService.createParticipant(
      createParticipantDTO,
    );
  }

  @Delete('/delete')
  async deleteParticipant(
    @Body() deleteParticipantDto: DeleteParticipantDTO,
  ): Promise<boolean> {
    return await this.participantService.deleteParticipant(
      deleteParticipantDto,
    );
  }

  @Get('/token/:chatServiceId/:identity')
  async generateTokenByIdentity(
    @Param('chatServiceId') chatServiceId: string,
    @Param('identity') identity: string,
  ): Promise<GenerateTokenDTO> {
    return await this.participantService.generateTokenByIdentity(
      chatServiceId,
      identity,
    );
  }
}
