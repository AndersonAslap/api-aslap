import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: 'Dados do provedor stripe' })
export class CreateStripeProviderConfigV2RequestDto {
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
    example: '295',
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
