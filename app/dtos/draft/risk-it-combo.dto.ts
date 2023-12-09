import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'Risco IT (Impedimento ao Trabalho)' })
export class RiskITComboDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'IT',
    description:
      'Nome do produto (CDIG - Carteira Digital | APE - Acidentes Pessoais  | IT - Impedimento ao Trabalho)',
  })
  product: string;

  // TODO vehicle
  vehicle: undefined;

  // TODO phone
  phone: undefined;

  // TODO coverages
  coverages: undefined;
}
