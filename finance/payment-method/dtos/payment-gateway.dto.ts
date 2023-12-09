import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

@ApiSchema({ name: 'Forma de Pagamento' })
export class PaymentGatewayDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Id da relação paymentGateway:paymentMethod',
  })
  paymentGatewayMethodId: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Id da forma de pagamento',
  })
  paymentGatewayId: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'STRIPE | PICPAY | HUBFINTECH | U4CRYPTO',
    description: 'Nome da forma de pagamento',
  })
  paymentGatewayName: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Id da forma de pagamento',
  })
  paymentMethodId: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'CREDIT CARD | QR CODE ',
    description: 'Nome da forma de pagamento',
  })
  paymentMethodName: string;

  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: 'true',
    description:
      'Flag de indetificação se o pagamento será feito na emissão da apólice, por padrão é sempre verdadeiro',
  })
  hasPaymentOnIssue: boolean;
}
