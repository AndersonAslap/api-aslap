import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Retorno Motivos' })
export class ResponseTMReasonDto {
  @ApiPropertyOptional({
    type: Number,
    example: 29,
  })
  id: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Conjutivite',
  })
  description: string;
}
