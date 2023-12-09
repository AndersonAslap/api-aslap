import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ApiSchema({ name: 'Cotação de planos pré-configurados por range' })
export class RequestQuotePreconfiguredByRangeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 7,
    description: 'Código da campanha.',
    required: true,
  })
  campaignId: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'CDIG',
    description: 'Sigla do produto',
  })
  product: string;
}
