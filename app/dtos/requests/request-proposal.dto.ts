import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

@ApiSchema({ name: 'Proposta' })
export class RequestProposalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'APE',
    description:
      'Nome do produto (CDIG - Carteira Digital | APE - Acidentes Pessoais  | IT - Impedimento ao Trabalho)',
    required: true,
  })
  product: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
    required: true,
  })
  campaignId: number;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48',
    description:
      'Data de inicio de vigência, apenas para casos onde é uma apólice deve ter menos de 1 mês de duração.',
  })
  effectiveDate: Date;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-23T18:36:48',
    description:
      'Data de Fim de vigência, apenas para casos onde é uma apólice deve ter menos de 1 mês de duração.',
  })
  expiryDate: Date;

  // TODO customer
  customer: undefined;

  // TODO risks
  risks: undefined;
}
