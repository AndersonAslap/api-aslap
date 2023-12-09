import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@ApiSchema({ name: 'Stripe Provider Config' })
export class StripeProviderConfigDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'mastercard',
    description:
      'Bandeira do cartão. Pode ser: mastercard, visa, elo, amex, discover, aura, jcb, hipercard',
    required: true,
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Asnésio da Silva',
    description: 'Nome do detentor do cartão',
    required: true,
  })
  holderName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 123456,
    description: 'Primeiros 6 dígitos do cartão de crédito',
    required: true,
  })
  firstDigits: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 1234,
    description: 'Últimos 4 dígitos do cartão de crédito',
    required: true,
  })
  lastDigits: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'BR',
    description: 'País de origem do cartão (formato ISO 3166-1 alpha-2)',
    required: true,
  })
  country: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description:
      'Flag baseada na validade do cartão dizendo se está válido ou não',
    required: true,
  })
  valid: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Ntjtk/Hk/QnY',
    description:
      'Hash que permite comparar dois cartões através de seus fingerprints para saber se são o mesmo.',
    required: true,
  })
  fingerprint: string;
}
