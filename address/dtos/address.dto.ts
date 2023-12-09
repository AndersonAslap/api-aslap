import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Endereço' })
export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '01001000',
    required: true,
  })
  cep: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Praça da Sé',
    required: true,
  })
  street: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '321',
    required: true,
  })
  number: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'apto. 321',
    required: true,
  })
  complement: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Sé',
    required: true,
  })
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'São Paulo',
    required: true,
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'SP',
    required: true,
  })
  state: string;
}
