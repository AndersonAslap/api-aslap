import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Parcelas' })
export class ResponseGetSubscriptionChargeDto {
  @ApiPropertyOptional({
    type: Number,
    example: 268,
    description: 'Id da parcela',
  })
  id: number;

  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Número da parcela',
  })
  number: number;

  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description: 'Status da parcela',
  })
  statusId: number;

  @ApiPropertyOptional({
    type: Number,
    example: 103,
    description: 'Id da assinatura',
  })
  subscriptionId: number;

  @ApiPropertyOptional({
    type: String,
    example: 'POPEI00001886-001',
    description: 'Código do endosso de renovação de vigência',
  })
  endoId: string;

  @ApiPropertyOptional({
    type: Date,
    example: '2021-06-25',
    description: 'Data de cobrança',
  })
  dueDt: Date;

  @ApiPropertyOptional({
    type: Number,
    example: 21.02,
    description: 'Valor da parcela',
  })
  value: number;

  @ApiPropertyOptional({
    type: Date,
    example: '2021-07-16T14:06:40.000Z',
    description: 'Criação da parcela',
  })
  creationAt: Date;

  @ApiPropertyOptional({
    type: Date,
    example: '2021-07-16T14:06:40.000Z',
    description: 'Atualização da parcela',
  })
  updateAt: Date;
}
