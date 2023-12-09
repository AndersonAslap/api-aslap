import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@ApiSchema({ name: 'Proposta Combo' })
export class RequestProposalComboDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 6,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
    required: true,
  })
  campaignId: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    example: '2021-04-22T18:36:48',
    description: 'Data de inicio de vigência',
    required: true,
  })
  effectiveDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    example: '2022-04-22T18:36:48',
    description: 'Data de Fim de vigência',
    required: true,
  })
  expiryDate: Date;

  // TODO customer
  customer: undefined;

  // TODO risks
  risks: undefined;
}
