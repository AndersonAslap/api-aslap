import { Module } from '@nestjs/common';
import { FinancePaymentMethodService } from './finance-payment-method.service';
import { FinancePaymentMethodController } from './finance-payment-method.controller';

@Module({
  controllers: [FinancePaymentMethodController],
  providers: [FinancePaymentMethodService],
})
export class FinancePaymentMethodModule {}
