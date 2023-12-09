import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNumber, IsDate, IsString } from 'class-validator';

@ApiSchema({ name: 'Retorno Agendamento' })
export class ResponseTMScheduleDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
  })
  sessionId: number;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-06-23 17:36:09',
  })
  timestamp: Date;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'https://wuos.app.link/345dsfg34',
    description: 'Link da sessão.',
  })
  sessionLink: string;
}
