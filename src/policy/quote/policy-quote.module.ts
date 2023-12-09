import { Module } from '@nestjs/common';
import { PolicyQuoteController } from './policy-quote.controller';
import { PolicyQuoteService } from './policy-quote.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductService } from '../../product/product.service';
import { PartnerService } from '../../partner/partner.service';

@Module({
  imports: [PrismaModule],
  controllers: [PolicyQuoteController],
  providers: [PolicyQuoteService, PartnerService, ProductService],
})
export class PolicyQuoteModule {}
