import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';
import { PolicyCancellationReasonEnum } from '../../app/enums/PolicyCancellationReason.enum';

@ApiSchema({ name: 'Requisição de cancelamento de apólice' })
export class RequestCancelPolicyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '546799e9-8843-4cca-8b49-92ac4388a54f',
    description: 'Id da apólice.',
    required: true,
  })
  policyId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    `^${Object.values(PolicyCancellationReasonEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  @ApiProperty({
    type: String,
    enum: PolicyCancellationReasonEnum,
    example: 'other',
    description: 'Motivo do cancelamento da apólice.',
    required: true,
  })
  cancellationReason: PolicyCancellationReasonEnum;
}
