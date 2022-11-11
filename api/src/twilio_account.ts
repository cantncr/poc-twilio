import { Twilio } from 'twilio';

export class TwilioAccount {
  private static client: Twilio;

  static getClient() {
    if (!this.client) {
      this.client = new Twilio(
        process.env.SERVICE_TWILIO_ACCOUNT_SID,
        process.env.SERVICE_TWILIO_AUTH_TOKEN,
      );
    }

    return this.client;
  }
}
