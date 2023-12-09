import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Retorno de coberturas preconfiguradas' })
class CoverageDto {
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Código da cobertura',
  })
  code: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Morte Acidental',
    description: 'Nome da cobertura',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Descrição da cobertura',
  })
  information: string;

  @ApiPropertyOptional({
    type: String,
    example: 'C101112',
    description: 'Código da cobertura eBao',
  })
  eBaoCode: string;

  @ApiPropertyOptional({
    type: Number,
    example: 1700.01,
    description: 'Valor segurado',
  })
  sumInsured: number;

  @ApiPropertyOptional({
    type: Number,
    example: 3,
    description: 'Diarias seguradas',
  })
  daily: number;

  @ApiPropertyOptional({
    type: Number,
    example: 168.01,
    description: 'Valor anual da cobertura',
  })
  value: number;

  @ApiPropertyOptional({
    type: Number,
    example: 16.8,
    description: 'Valor mensal da cobertura',
  })
  valueMonthly: number;

  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Valor de agrupamento de item para ser apresentado no front',
  })
  groupId: number;
}

@ApiSchema({ name: 'Retorno de planos pré-configurados' })
export class ResponseQuotePreconfiguredDto {
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Código do plano/combo',
  })
  id: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Plano',
    description: 'Nome do combo',
  })
  description: string;

  @ApiPropertyOptional({ type: [CoverageDto] })
  coverages: CoverageDto[];

  @ApiPropertyOptional({
    type: Number,
    example: 15.5,
    description: 'Valor mensal da assinatura',
  })
  amountMonthly: number;

  @ApiPropertyOptional({
    type: Number,
    example: 155,
    description: 'Valor anual da assinatura',
  })
  amount: number;
}
