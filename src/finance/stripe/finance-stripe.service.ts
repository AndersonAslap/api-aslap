import { Injectable } from '@nestjs/common';
import { RequestCreditCardDto } from '../../app/dtos/requests/request-credit-card.dto';
import generateTicketId from '../../utils/generate-ticket-id';

@Injectable()
export class FinanceStripeService {
  async create(dto: RequestCreditCardDto): Promise<any> {
    // TODO
    console.log('FinanceStripeService.create');
    return generateTicketId();
  }
}
