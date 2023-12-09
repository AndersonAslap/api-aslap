import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsArray, IsNumber, IsString } from 'class-validator';

class ReorderDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 3,
    description: 'Nova posição de preferencia do meio de pagamento',
  })
  order: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Id do meio de pagamento criada',
  })
  paymentMethodId: string;
}

@ApiSchema({ name: 'Reordenação Meio de Pagamento V2' })
export class ReorderPaymentMethodRequestV2Dto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  userId: string;

  @IsArray()
  @ApiPropertyOptional({
    type: [ReorderDto],
  })
  reorder: ReorderDto[];
}
