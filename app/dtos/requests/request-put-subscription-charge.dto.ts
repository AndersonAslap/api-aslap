import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNumber } from 'class-validator';

@ApiSchema({ name: 'Atualização da Parcela' })
export class RequestPutSubscriptionChargeDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 3,
    description:
      'Status do pagamento da parcela. (1 - PENDENTE,2 - PAGO,3 - RECUSADO,4 - REEMBOLSADO,5 - EXPIRADO,6 - DESCONHECIDO,7 - CANCELADO)',
  })
  statusId: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description: 'Id da assinatura.',
  })
  subscriptionId: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Número da parcela',
  })
  number: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description:
      'Motivo do status. (1 - SALDO INSUFICIENTE,2 - ANTIFRAUDE,3 - ADQUIRENTE,4 - ERRO INTERNO,5 - SEM ADQUIRENTE,6 - ADQUIRENTE TEMPO LIMITE,7 - EXPIRED CARD)',
  })
  reasonId: number;
}
