import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { CustomerDto } from '../../../customer/dtos/customer.dto';
import { Type } from 'class-transformer';
import { RequestPolicyDto } from './request-policy.dto';

@ApiSchema({ name: 'Metadado' })
class MetadataDto {
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    type: [String],
    required: true,
    example: ['d31645fb-2c4c-45eb-9f76-6a5dd496496f'],
    description:
      'Código da Proposta retornado pela api de geração proposta. (ticket)',
  })
  proposals: string[];
}

@ApiSchema({ name: 'Pagamento' })
class PaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 23,
    description: 'Valor da 1 parcela a ser pago',
    required: true,
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Acidentes Pessoais',
    description: 'Breve descrição do pagamento.',
    required: true,
  })
  title: string;

  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, required: true })
  customer: CustomerDto;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  @ApiProperty({ type: MetadataDto, required: true })
  metadata: MetadataDto;
}

@ApiSchema({ name: 'Emissão da Apólice com Cartão de Crédito' })
export class RequestCreditCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '39303389808',
    description: 'CPF do responsável pelo cartão',
    required: true,
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '0629',
    description: 'Data de expiração do cartão. Formato: MMYY',
    required: true,
  })
  expirationDt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Rafael Teste',
    description: 'Nome do responsável pelo cartão',
    required: true,
  })
  holderName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '5257573512638409',
    description: 'Número do cartão',
    required: true,
  })
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '321',
    description: 'Código de segurança do cartão',
    required: true,
  })
  cvv: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
  })
  campaignId: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentDto)
  @ApiProperty({ type: PaymentDto, required: true })
  payment: PaymentDto;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => RequestPolicyDto)
  @ApiProperty({ type: [RequestPolicyDto], required: true })
  policies: RequestPolicyDto[];
}
