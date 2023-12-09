import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: 'Buscar Meio de Pagamento V2' })
export class FindPaymentMethodRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  paymentMethodId: string;
}
