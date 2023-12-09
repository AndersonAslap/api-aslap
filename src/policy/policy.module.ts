import { Module } from '@nestjs/common';
import { PolicyQuoteModule } from './quote/policy-quote.module';
import { PolicyProposalModule } from './proposal/policy-proposal.module';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PolicyQuoteModule, PolicyProposalModule, PrismaModule],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
