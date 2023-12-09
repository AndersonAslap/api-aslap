import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNumber } from 'class-validator';

@ApiSchema({ name: 'Plano' })
class QuoteCalculateRangePlanResponseDto {
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Código da cobertura',
  })
  code: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Morte e invalidez por crime',
    description: 'Nome da cobertura',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    example:
      'Laoreet orci tristique id. Quisque vel ante luctus, eleifend neque id',
    description: 'Descrição da cobertura',
  })
  information: string;

  @ApiPropertyOptional({
    type: String,
    example:
      'Laoreet orci tristique id. Quisque vel ante luctus, eleifend neque id',
    description: 'Descrição longa da cobertura',
  })
  longDescription: string;

  @ApiPropertyOptional({
    type: String,
    example: 'C101112',
    description: 'Código da cobertura eBao',
  })
  eBaoCode: string;

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
    example: 16.8,
  })
  sumInsured: number;

  @ApiPropertyOptional({
    type: Number,
    example: 1000,
    description: 'Valor inicial do range',
  })
  rangeFrom: number;

  @ApiPropertyOptional({
    type: Number,
    example: 10000,
    description: 'Valor final do range',
  })
  rangeTo: number;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    description: 'Define se deve ou não aparecer na listagem',
  })
  isRequired: boolean;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real total',
  })
  realValue: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real mensal',
  })
  realMonthlyValue: number;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    description: 'Informa se tem desconto',
  })
  hasDiscount: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    description: 'Informa se tem incremento',
  })
  hasIncrement: boolean;
}

@ApiSchema({ name: 'Retorno Cobertura Range' })
class QuoteCalculateRangeCoverageResponseDto {
  @ApiPropertyOptional({
    type: Number,
    example: 132.4668,
    description: 'Valor total',
  })
  value: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor mensal',
  })
  valueMonthly: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real mensal',
  })
  realMonthlyValue: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real total',
  })
  realValue: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Incremento ou desconto',
  })
  incrementedOrDiscountedBy: number;

  @ApiPropertyOptional({
    type: [QuoteCalculateRangePlanResponseDto],
  })
  plans: QuoteCalculateRangePlanResponseDto[];
}

@ApiSchema({ name: 'Retorno Serviço Range' })
class QuoteCalculateRangeServiceResponseDto {
  @ApiPropertyOptional({
    type: Number,
    example: 132.4668,
    description: 'Valor total',
  })
  valueTotal: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor mensal',
  })
  valueMonthlyTotal: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Incremento ou desconto',
  })
  incrementedOrDiscountedBy: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real mensal',
  })
  realMonthlyValue: number;

  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real total',
  })
  realValue: number;

  @ApiPropertyOptional({
    type: [QuoteCalculateRangePlanResponseDto],
  })
  plans: QuoteCalculateRangePlanResponseDto[];
}

@ApiSchema({ name: 'Retorno valores coberturas' })
export class ResponseCalculateRangeListDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 132.4668,
    description: 'Valor total',
  })
  valueTotal: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor mensal',
  })
  valueMonthlyTotal: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Incremento ou desconto',
  })
  incrementedOrDiscountedBy: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real mensal',
  })
  realMonthlyValue: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 11.0387,
    description: 'Valor real total',
  })
  realValue: number;

  @ApiPropertyOptional({
    type: [QuoteCalculateRangeCoverageResponseDto],
  })
  coverages: QuoteCalculateRangeCoverageResponseDto[];

  @ApiPropertyOptional({
    type: [QuoteCalculateRangeServiceResponseDto],
  })
  servicos: QuoteCalculateRangeServiceResponseDto[];
}
