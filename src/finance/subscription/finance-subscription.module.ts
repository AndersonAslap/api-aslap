import { Module } from '@nestjs/common';
import { FinanceSubscriptionController } from './finance-subscription.controller';
import { FinanceSubscriptionService } from './finance-subscription.service';

@Module({
  controllers: [FinanceSubscriptionController],
  providers: [FinanceSubscriptionService],
})
export class FinanceSubscriptionModule {}
