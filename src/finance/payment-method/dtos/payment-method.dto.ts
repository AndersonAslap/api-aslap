import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

@ApiSchema({ name: 'Meio de Pagamento' })
export class PaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 99999999990,
    description: 'Id do usuário que deseja criar o meio de pagamento (CPF)',
    required: true,
  })
  userId: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'card_123456789',
    description:
      'Id do meio de pagamento criada em algum provedor (caso não seja fornecido será criado um automaticamente)',
  })
  paymentMethodId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'stripe',
    description: 'Quem é o provedor do meio de pagamento',
    required: true,
  })
  provider: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description:
      'Ordem de preferência do meio de pagamento onde o menor número é o com maior relevância',
  })
  preferenceOrder: number;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48',
    description: 'Data de criação do meio de pagamento',
  })
  createdAt: Date;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48',
    description: 'Data ultima atualização do meio de pagamento',
  })
  updatedAt: Date;

  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: 'true',
    description: 'Se o meio de pagamento está ativa ou não',
  })
  active: boolean;

  // TODO config
  config: undefined;
}
