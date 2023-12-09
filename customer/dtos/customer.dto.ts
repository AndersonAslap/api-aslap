import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';
import { CustomerGenderEnum } from '../../app/enums/CustomerGender.enum';
import { AddressDto } from '../../address/dtos/address.dto';
import { ContactDto } from '../../contact/dtos/contact.dto';

@ApiSchema({ name: 'Customer' })
export class CustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Vinicius dantas',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiPropertyOptional({
    type: Date,
    example: '2000-04-22T00:00:00.000Z',
    description: 'Data de nascimento',
  })
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.replace(/\./g, '').replace(/\-/g, ''))
  @ApiProperty({
    type: String,
    example: '00882815075',
    required: true,
    description: 'CPF do responsável pela apólice',
  })
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    `^${Object.values(CustomerGenderEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  @ApiProperty({
    type: String,
    example: CustomerGenderEnum.M,
    enum: CustomerGenderEnum,
    description:
      'Genero do segurado (M - masculino | F - feminino | NB - não binário | O - outro)',
    required: true,
  })
  gender: CustomerGenderEnum;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Define se é uma pessoa politicamente exposta.',
  })
  politicallyExposedPerson?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Define a profissão do segurado',
  })
  profession?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Define a quantidade de filhos do segurado',
  })
  childQuantity?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Define a renda do segurado',
  })
  income?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Define se o segurado tem PET',
  })
  hasPet?: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactDto)
  @ApiProperty({ type: ContactDto })
  contact: ContactDto;
}
