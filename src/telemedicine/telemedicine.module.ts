import { Module } from '@nestjs/common';
// import { TelemedicineController } from './telemedicine.controller';
import { TelemedicineService } from './telemedicine.service';

@Module({
  controllers: [],
  providers: [TelemedicineService],
})
export class TelemedicineModule {}
