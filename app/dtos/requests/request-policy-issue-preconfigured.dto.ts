import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

@ApiSchema({ name: 'Proposta com Combo' })
export class RequestPolicyIssuePreconfiguredDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '1231231231',
    description: 'Id de referencia do parceiro',
  })
  referenceId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
    required: true,
  })
  campaignId: number;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48',
    description:
      'Data de inicio de vigência. Apenas para apólice intermitente.',
  })
  effectiveDate: Date;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T19:36:48',
    description: 'Data de Fim de vigência. Apenas para apólice intermitente.',
  })
  expiryDate: Date;

  // TODO customer
  customer: undefined;

  // TODO risks
  risks: undefined;

  // TODO payment
  payment: undefined;

  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: 'true',
    description: 'Informa se deverá ser enviado o arquivo da apólice',
  })
  sendMail: boolean;

  // TODO mailTo
  mailTo: undefined;
}
