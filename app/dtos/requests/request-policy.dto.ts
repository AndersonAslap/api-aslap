import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsDefined,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

@ApiSchema({ name: 'Valor Fixo' })
class AmountDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    example: 23,
    description: 'Valor da 1 parcela a ser pago',
  })
  amount: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: Date,
    required: true,
    example: '2021-10-28T01:32:16.438Z',
    description: 'Data e hora do pagamento.',
  })
  date: Date;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: true,
    example: 'd31645fb-2c4c-45eb-9f76-6a5dd4964961',
    description: 'Identificador da transação.',
  })
  transactionId: string;
}

@ApiSchema({ name: 'Retorno do Pagamento a ser processado' })
export class RequestPolicyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'd31645fb-2c4c-45eb-9f76-6a5dd496496f',
    description:
      'Código da Proposta retornado pela api de geração proposta. (ticket)',
    required: true,
  })
  proposal: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 3,
    required: true,
  })
  typeId: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AmountDto)
  @ApiProperty({ type: AmountDto, required: true })
  payment: AmountDto;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    description: 'Informa se deverá ser enviado o arquivo da apólice',
  })
  sendMail: boolean;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    type: [String],
    required: true,
    example: ['rafael@olgaseguros.com'],
    description: 'Email do cliente que deve receber o arquivo da apólice',
  })
  mailTo: string[];
}
