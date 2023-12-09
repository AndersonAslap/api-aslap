import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: 'Risco Combo APE (Acidentes Pessoais)' })
export class RiskAPEComboDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'APE',
    description:
      'Nome do produto (CDIG - Carteira Digital | APE - Acidentes Pessoais | IT - Impedimento ao Trabalho)',
    required: true,
  })
  product: string;

  // TODO beneficiaries
  beneficiaries: undefined;

  // TODO coverages
  coverages: undefined;
}
