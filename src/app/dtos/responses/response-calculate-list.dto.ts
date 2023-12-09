import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Valor a ser cobrado por cobertura ao mês' })
export class ResponseQuoteCalculateDto {
  @ApiPropertyOptional({
    type: Number,
    example: 15,
    description: 'Código da cobertura retornado na cotação',
  })
  code: number;

  @ApiPropertyOptional({
    type: Number,
    example: 168.01,
    description: 'Valor da cobertura por mês',
  })
  value: number;
}
