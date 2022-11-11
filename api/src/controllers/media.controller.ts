import { Body, Controller, Post } from '@nestjs/common';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import MediaService from '../services/media.service';
import { AddMediaDTO } from '../dto/media.dto';

@Controller('/media')
export default class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('/send/:conversationId')
  async sendMessage(@Body() mediaDto: AddMediaDTO): Promise<MessageInstance> {
    return await this.mediaService.createMediaMessage(mediaDto);
  }
}
