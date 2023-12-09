import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Cobertura' })
class CoverageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 15,
    description: 'Código da cobertura retornado na cotação',
  })
  code: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 168.01,
    description: 'Valor da cobertura retornado na cotação',
  })
  value: number;
}

@ApiSchema({ name: 'Calcula o valor de uma lista de coberturas' })
export class RequestQuoteCalculateListDto {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty({
    type: CoverageDto,
  })
  coverage: CoverageDto;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 100,
    description: 'Porcentagem do aparelho que está sendo coberta',
  })
  cover: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 25,
    description: 'Fraquia a ser cobrada',
  })
  deductible: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 12,
    description:
      'Quantidade de parcelas a ser dividido o valor total da cobertura',
  })
  billingDivider: number;
}
