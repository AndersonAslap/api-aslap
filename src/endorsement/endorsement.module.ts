import { Module } from '@nestjs/common';
import { EndorsementController } from './endorsement.controller';
import { EndorsementService } from './endorsement.service';

@Module({
  controllers: [EndorsementController],
  providers: [EndorsementService],
})
export class EndorsementModule {}
