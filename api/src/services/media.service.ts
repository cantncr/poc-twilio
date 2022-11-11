import { Injectable } from '@nestjs/common';
import { AddMediaDTO } from '../dto/media.dto';
import { TwilioAccount } from '../twilio_account';
const axios = require('axios');

@Injectable()
export default class MediaService {
  private client = TwilioAccount.getClient();

  public createMediaMessage = async (mediaDto: AddMediaDTO): Promise<any> => {
    const fs = require('fs');

    try {
      const successMediaSids = [];
      const buffer = fs.readFileSync('/Users/b.gul.t/Desktop/image.png');

      axios.defaults.baseURL = 'https://mcs.us1.twilio.com';
      axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
        `${process.env.SERVICE_TWILIO_ACCOUNT_SID}:${process.env.SERVICE_TWILIO_AUTH_TOKEN}`,
      )}`;
      axios.defaults.headers.post['Content-Type'] = 'image/png';

      await axios
        .post(`/v1/Services/${mediaDto.chatServiceId}/Media`, buffer)
        .then(function (response) {
          successMediaSids.push(response.data.sid);
        })
        .catch(function (error) {
          console.log(error);
        });

      return await this.client.conversations.v1
        .conversations(`${mediaDto.conversationId}`)
        .messages.create({
          author: mediaDto.author,
          body: mediaDto.body,
          mediaSid: successMediaSids[0],
        });
    } catch (err) {
      console.log('err ', err);
    }
  };
}
