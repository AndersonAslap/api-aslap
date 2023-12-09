import { Module } from '@nestjs/common';
import { PolicyProposalService } from './policy-proposal.service';
import { PolicyProposalController } from './policy-proposal.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CustomerService } from '../../customer/customer.service';
import { ProductService } from '../../product/product.service';
import { PartnerService } from '../../partner/partner.service';
import { PolicyQuoteService } from '../quote/policy-quote.service';

@Module({
  imports: [PrismaModule],
  controllers: [PolicyProposalController],
  providers: [
    PolicyProposalService,
    CustomerService,
    ProductService,
    PolicyQuoteService,
    PartnerService,
  ],
})
export class PolicyProposalModule {}
