import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsDefined,
  IsObject,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@ApiSchema({ name: 'Dados do provedor stripe' })
class ConfProviderStripe {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '0825',
    description: 'Data de expiração do cartão formato MMYY',
    required: true,
  })
  expirationDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '5100188512464653',
    description: 'Número do cartão de crédito',
    required: true,
  })
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'Código verificador do cartão',
    required: true,
  })
  cvv: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Simplício S Simplório',
    description: 'Nome impresso no cartão',
    required: true,
  })
  holderName: string;
}

@ApiSchema({
  name: 'Dados do provedor picpay (nenguma configuração necessária)',
})
class ConfProviderPicPay {}

@ApiExtraModels(ConfProviderStripe, ConfProviderPicPay)
@ApiSchema({ name: 'Criação Meio de Pagamento V2' })
export class CreatePaymentMethodV2RequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 99999999990,
    description: 'Id do usuário que deseja criar o meio de pagamento (CPF)',
    required: true,
  })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'card_123456789',
    description:
      'Id do meio de pagamento criada em algum provedor (caso não seja fornecido será criado um automaticamente)',
    required: true,
  })
  provider: string;

  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: 'true',
    description:
      'Se é o cartão preferido ou não (se true entra como primeiro da list e false para o final)',
  })
  isPreferred: boolean;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Id da relação gateway <> método de pagamento',
  })
  gatewayMethodId: number;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  @ApiProperty({
    required: false,
    type: () => Object,
    oneOf: [
      { $ref: getSchemaPath(ConfProviderStripe) },
      { $ref: getSchemaPath(ConfProviderPicPay) },
    ],
  })
  config: ConfProviderStripe | ConfProviderPicPay;
}
