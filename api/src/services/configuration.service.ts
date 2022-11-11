import { Injectable } from '@nestjs/common';
import { ConfigurationContext } from 'twilio/lib/rest/conversations/v1/service/configuration';
import { TwilioAccount } from '../twilio_account';

@Injectable()
export default class ConfigurationService {
  changeReachability(
    serviceId: string,
    reachabilityValue: boolean,
  ): PromiseLike<ConfigurationContext> {
    return this.client.conversations.v1
      .services(`${serviceId}`)
      .configuration(`${serviceId}`)
      .update({
        reachabilityEnabled: reachabilityValue,
      });
  }
  private client = TwilioAccount.getClient();

  public listConfigurations = async (
    serviceId: string,
  ): Promise<ConfigurationContext> => {
    return await this.client.conversations.v1
      .services(`${serviceId}`)
      .configuration(`${serviceId}`)
      .fetch();
  };
}
