import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JuntoController } from './junto.controller';

@Module({
  imports: [HttpModule],
  controllers: [JuntoController],
  providers: [],
})
export class JuntoModule {}
