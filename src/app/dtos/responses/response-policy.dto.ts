import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Retorno do apólice a ser processado' })
export class ResponsePolicyDto {
  @ApiPropertyOptional({
    type: String,
    example: '753bd0b2-0929-405e-b57f-7824598a793a',
    description: 'Código da cotação',
  })
  proposalId: string;

  @ApiPropertyOptional({
    type: String,
    example: '753bd0b2-0929-405e-b57f-7824598a793a',
    description: 'Código do customer',
  })
  customerId: string;
}
