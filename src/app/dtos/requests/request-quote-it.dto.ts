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

@ApiSchema({ name: 'InsuredCoveragesIT' })
class InsuredCoveragesIT {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Roubo de Carro no Trabalho',
  })
  workCarTheftDaily: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Colisão de Veículos Diariamente',
  })
  vehicleCollisionDaily: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Deslocamento Diário',
  })
  displacementDaily: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1000.01,
    description: 'Roubo de Celular',
  })
  cellTheftDaily: number;
}

@ApiSchema({ name: 'Cotação de Impedimento ao Trabalho' })
export class RequestQuoteITDto {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 100.01,
    description: 'Valor da diária',
    required: true,
  })
  dailyInsured: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InsuredCoveragesIT)
  @ApiProperty({
    type: InsuredCoveragesIT,
    required: true,
    description:
      'Coberturas a serem seguradas - **obrigatório informar ao menos 1**',
  })
  insuredCoverages: InsuredCoveragesIT;
}
