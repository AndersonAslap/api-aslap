import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

class ProductTypeDto {
  @ApiPropertyOptional({
    type: String,
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  code: string;

  @ApiPropertyOptional({
    type: String,
  })
  susepCode: string;
}
@ApiSchema({ name: 'Produto' })
export class ProductResponseDto {
  @ApiPropertyOptional({
    type: String,
    example: 'cea1e9da-3c6e-4a6a-8f54-297cdeeede9e',
    description: 'Id do parceiro Olga Seguros',
  })
  productId: string;

  @ApiPropertyOptional({
    type: ProductTypeDto,
  })
  product: ProductTypeDto;

  @ApiPropertyOptional({
    type: String,
    description: 'Descrição do produto',
  })
  description: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Idade Máxima do produto',
  })
  maxAge: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'quantidade de dias de duração do produto',
  })
  durationDays: number;

  @ApiPropertyOptional({
    type: Date,
    description: 'Data de inicio da cobertura',
  })
  initialValidDate: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'Data de inicio da cobertura',
  })
  finaleValidDate: Date;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor do prêmio do produto',
  })
  price: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor do iof do produto',
  })
  iof: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor da comissão do produto',
  })
  comission: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor da franquia do produto',
  })
  insuranceDeductible: number;

  insuredCoverages: [];
}
