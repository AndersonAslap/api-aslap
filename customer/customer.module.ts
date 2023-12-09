import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CustomerService],
})
export class CustomerModule {}
