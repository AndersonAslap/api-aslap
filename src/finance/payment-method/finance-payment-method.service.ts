import { Injectable } from '@nestjs/common';

import * as paymentCreate_Mock from './mocks/payment-create.json';
import * as paymentFind_Mock from './mocks/payment-find.json';
import * as paymentList_Mock from './mocks/payment-list.json';
import * as paymentReorder_Mock from './mocks/payment-reorder.json';
import * as paymentGateway_Mock from './mocks/payment-gateway.json';

@Injectable()
export class FinancePaymentMethodService {
  async create(dto: any): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.create');
    return paymentCreate_Mock;
  }

  async find(dto: any): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.find');
    const result = paymentFind_Mock;
    result.userId = dto.userId;
    result.paymentMethodId = dto.paymentMethodId;

    return result;
  }

  async list(dto: any): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.list');
    const result = paymentList_Mock;
    result.userId = dto.userId;

    return result;
  }

  async reOrder(dto: any): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.reOrder');
    const result = paymentReorder_Mock;
    result[0].userId = dto.userId;
    result[0].preferenceOrder = dto.reorder[0].order;
    result[0].paymentMethodId = dto.reorder[0].paymentMethodId;

    return result;
  }

  async remove(dto: any): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.remove');
    return dto;
  }

  async paymentGateway(campaignId: string): Promise<any> {
    // TODO
    console.log('FinancePaymentMethodService.paymentGateway');
    return paymentGateway_Mock;
  }
}
