import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'Beneficiário' })
export class BeneficiaryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'vinicius dantas',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.replace(/\./g, '').replace(/\-/g, ''))
  @ApiProperty({
    type: String,
    example: '00882815075',
    required: true,
    description: 'CPF do beneficiário',
  })
  document: string;

  @Transform(({ value }) => {
    return value
      ? value
          .replace(/\./g, '')
          .replace(/\-/g, '')
          .replace(/\(/g, '')
          .replace(/\)/g, '')
          .replace(/\ /g, '')
      : null;
  })
  @ApiPropertyOptional({
    type: String,
    example: '+5511999999999',
    description: 'Telefone do beneficiário',
  })
  phone: string;

  @IsString()
  @IsEmail()
  @ApiPropertyOptional({
    type: String,
    example: 'rafael@olgaseguros.com',
    description: 'Email beneficiário',
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Grau de parentesco',
    required: true,
  })
  degreeOfKinshipId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 99.9,
    description: 'Percentual de participação',
    required: true,
  })
  percentageOfParticipation: number;
}
