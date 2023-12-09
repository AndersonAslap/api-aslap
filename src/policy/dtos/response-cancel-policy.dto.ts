import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Resposta de cancelamento de apólice' })
export class ResponseCancelPolicyDto {
  @ApiProperty({
    type: Date,
    example: '2023-01-30',
    description: 'Data de corte da apólice.',
    required: true,
  })
  cutOffDate: Date;
}
