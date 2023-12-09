import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ApiSchema({ name: 'Cotação de planos pré-configurados' })
export class RequestQuotePreconfiguredDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 7,
    description: 'Código da campanha.',
    required: true,
  })
  campaignId: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 7000,
    description: 'Valor segurado.',
  })
  sumInsured: number;
}
