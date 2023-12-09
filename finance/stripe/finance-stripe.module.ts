import { Module } from '@nestjs/common';
import { FinanceStripeController } from './finance-stripe.controller';
import { FinanceStripeService } from './finance-stripe.service';

@Module({
  controllers: [FinanceStripeController],
  providers: [FinanceStripeService],
})
export class FinanceStripeModule {}
