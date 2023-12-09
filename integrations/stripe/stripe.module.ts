import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [],
})
export class StripeModule {}
