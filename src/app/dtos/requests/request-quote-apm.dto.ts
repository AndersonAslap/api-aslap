import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDefined,
  IsObject,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@ApiSchema({ name: 'InsuredCoverages' })
class InsuredCoverages {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Morte Acidental Segurado',
  })
  accidentalDeathInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Acidente de Invalidez Segurado',
  })
  accidentDisabilityInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Farmácia com desconto Segurado',
  })
  discountedPharmacyInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Assistência Funeral Segurado',
  })
  funeralAssistanceInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Sorteios Segurado',
  })
  sweepstakesInsured: number;
}

@ApiSchema({ name: 'Cotação de Acidentes Pessoais' })
export class RequestQuoteAPMDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'APM',
    description: 'Nome do produto (APM - Acidentes Pessoais)',
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

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InsuredCoverages)
  @ApiProperty({
    type: InsuredCoverages,
    required: true,
    description:
      'Coberturas a serem seguradas - **obrigatório informar ao menos 1**',
  })
  insuredCoverages: InsuredCoverages;
}
