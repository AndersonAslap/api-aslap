import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

@ApiSchema({ name: 'Cobertura Range' })
class RangeCoverageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 486,
    description: 'Código da cobertura retornado na cotação',
  })
  code: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 4000,
    description: 'Valor do range da cobertura',
  })
  insuredValue: number;
}

@ApiSchema({ name: 'Serviço Range' })
class RangeServiceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 486,
    description: 'Código do serviço retornado na cotação',
  })
  code: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 4000,
    description: 'Valor do range do serviço',
  })
  insuredValue: number;
}

@ApiSchema({
  name: 'Calcula o valor de uma lista de coberturas com base do valor do range',
})
export class RequestQuoteCalculateRangeListDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 204,
    description: 'ID da Campanha',
    required: true,
  })
  campaignId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 'CDIG',
    description: 'Sigla do produto',
    required: true,
  })
  product: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @ApiProperty({
    type: [RangeCoverageDto],
  })
  coverage: RangeCoverageDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @ApiPropertyOptional({
    type: [RangeServiceDto],
  })
  services: RangeServiceDto[];
}
