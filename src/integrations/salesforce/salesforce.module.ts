import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SalesforceController } from './salesforce.controller';

@Module({
  imports: [HttpModule],
  controllers: [SalesforceController],
  providers: [],
})
export class SalesforceModule {}
