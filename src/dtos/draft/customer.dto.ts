import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AddressDto } from '../../address/dtos/address.dto';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'Customer' })
export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'vinicius dantas',
    required: true,
  })
  name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    example: '1998-11-16',
    required: true,
  })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '00882815075',
    description: 'CPF do responsável pela apólice',
    required: true,
  })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'rafael@olgaseguros.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '+5511999999999',
    description: 'telefone do responsável pela apólice',
    required: true,
  })
  phone: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '1231@senhA',
    description:
      'Senha de acesso do usuário a plataforma Olga Seguros. Deve conter número, letra minuscula e letra maiscula e caractere especial.',
  })
  password: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}
