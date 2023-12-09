import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'ParticipantsDto' })
export class ParticipantsDto {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Tipo de Beneficiario. (1 - Titular | 2 - Dependente)',
    required: true,
  })
  typeId: number;
}
