import { Module } from '@nestjs/common';
import { FinanceSubscriptionModule } from './subscription/finance-subscription.module';
import { FinancePaymentMethodModule } from './payment-method/finance-payment-method.module';
import { FinanceStripeModule } from './stripe/finance-stripe.module';

@Module({
  imports: [
    FinanceSubscriptionModule,
    FinancePaymentMethodModule,
    FinanceStripeModule,
  ],
})
export class FinanceModule {}
