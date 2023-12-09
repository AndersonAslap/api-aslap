import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@ApiSchema({ name: 'Cotação de Telemedicina' })
export class RequestQuoteTMDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'TM',
    description: 'Nome do produto (TM - Telemedicina)',
    required: true,
  })
  product: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
  })
  campaignId: number;
}
