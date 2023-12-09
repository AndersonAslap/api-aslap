import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { PaymentMethodDto } from './payment-method.dto';

@ApiSchema({ name: 'Resultado da Listagem de Meios de Pagamento' })
export class ListPaymentMethodResponseDto {
  @ApiPropertyOptional({
    type: String,
    example: 'user-id-1',
    description: 'Payment method user id',
  })
  userId: string;

  @ApiPropertyOptional({
    type: [PaymentMethodDto],
  })
  paymentMethods: PaymentMethodDto[];
}
