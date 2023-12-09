import { Injectable } from '@nestjs/common';

import * as getInstallments from './mocks/getInstallments.json';
import generateTicketId from '../../utils/generate-ticket-id';

@Injectable()
export class FinanceSubscriptionService {
  async getInstallments({
    statusId,
    subscriptionId,
  }: {
    statusId: number;
    subscriptionId: number;
  }): Promise<any> {
    // TODO
    console.log('FinanceSubscriptionService.getInstallments');
    const result = getInstallments;
    result[0].statusId = statusId;
    result[0].subscriptionId = subscriptionId;

    return result;
  }

  async updateInstallment(dto: any): Promise<any> {
    // TODO
    console.log('FinanceSubscriptionService.updateInstallment');
    return generateTicketId();
  }
}
