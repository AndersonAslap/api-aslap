import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PartnerController } from './partner.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [PartnerController],
  providers: [PartnerService, PrismaService],
  exports: [PartnerService],
})
export class PartnerModule {}
