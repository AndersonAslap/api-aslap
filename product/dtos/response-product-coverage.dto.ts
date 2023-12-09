import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

class InsuredCoverage {
  @ApiPropertyOptional({
    type: String,
    example: 'f4979895-f04e-45bc-87f5-0f36ec25a862',
    description: 'Id da cobertura',
  })
  insuredCoverageId: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor minimo da cobertura',
  })
  minValue: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Valor máximo da cobertura',
  })
  maxValue: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Periodo de carência da cobertura',
  })
  gracePeriod: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Descrição da cobertura',
  })
  description: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Informação da cobertura',
  })
  information: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Codigo (sigla) da cobertura',
  })
  code: string;
}

@ApiSchema({ name: 'Coberturas por produto' })
export class ResponseProductCoverageDto {
  @ApiPropertyOptional({
    type: String,
    example: '36bd72d8-0e93-44df-abbb-25354f00a8b7',
  })
  productId: string;

  @ApiPropertyOptional({
    type: [InsuredCoverage],
  })
  insuredCoverages: InsuredCoverage[];
}
