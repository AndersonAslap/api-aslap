import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Contato' })
export class ContactDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'rafael@olgaseguros.com',
    required: true,
    description: 'Email do responsável pela apólice',
  })
  email: string;

  @IsNotEmpty()
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
  @ApiProperty({
    type: String,
    example: '+5511999999999',
    required: true,
    description: 'Telefone do responsável pela apólice',
  })
  phoneNumber: string;
}
