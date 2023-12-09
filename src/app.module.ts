import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PolicyModule } from './policy/policy.module';
import { EndorsementModule } from './endorsement/endorsement.module';
import { FinanceModule } from './finance/finance.module';
import { TelemedicineModule } from './telemedicine/telemedicine.module';
import { EnumModule } from './enum/enum.module';
import { ProductModule } from './product/product.module';
import { AuthGuard } from './app/auth/guards/AuthGuard';
import { APP_GUARD } from '@nestjs/core';
import { ProviderModule } from './provider/provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { SalesforceModule } from './integrations/salesforce/salesforce.module';
import { JuntoModule } from './integrations/junto/junto.module';
import { StripeModule } from './integrations/stripe/stripe.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PolicyModule,
    EndorsementModule,
    FinanceModule,
    TelemedicineModule,
    EnumModule,
    ProductModule,
    ProviderModule,
    PrismaModule,
    CustomerModule,
    SalesforceModule,
    JuntoModule,
    StripeModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },*/
  ],
})
export class AppModule {}
