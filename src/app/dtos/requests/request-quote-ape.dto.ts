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

@ApiSchema({ name: 'InsuredCoveragesAPE' })
class InsuredCoveragesAPE {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Morte Acidental (MA)',
  })
  accidentalDeathInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Invalidez Permanente e Total por Acidente (IPTA)',
  })
  iptaInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description:
      'Despesas Médico-Hospitalares e Odontológicas por Acidente (DMHO)',
  })
  dmhoInsured: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Fratura Óssea',
  })
  boneFractureInsured: number;
}

@ApiSchema({ name: 'Cotação de Acidentes Pessoais V2' })
export class RequestQuoteAPEDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'APE',
    description: 'Nome do produto (APE - Acidentes Pessoais V2)',
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
  @Type(() => InsuredCoveragesAPE)
  @ApiProperty({
    type: InsuredCoveragesAPE,
    required: true,
    description:
      'Coberturas a serem seguradas - **obrigatório informar ao menos 1**',
  })
  insuredCoverages: InsuredCoveragesAPE;
}
