import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Cobertura do risco de IT' })
export class ITCoverageDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 13,
    description: 'Código da regra de calculo da cobertura',
    required: true,
  })
  code: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Valor segurado da cobertura',
    required: true,
  })
  sumInsured: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Número de diárias referente a cobertura.',
    required: true,
  })
  daily: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 14,
    description: 'Valor mensal da cobertura',
    required: true,
  })
  value: number;
}
