import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsNumber, IsString, IsDate } from 'class-validator';

@ApiSchema({ name: 'Retorno Participante' })
export class ResponseParticipantDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 11,
  })
  id: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Rafael Teste',
  })
  name: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '11988989898',
  })
  document: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'rafael@olgaseguros.com',
  })
  email: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '5511999999999',
  })
  phone: string;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-05-31T21:00:40.000Z',
  })
  birthDate: Date;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-05-31T21:00:40.000Z',
  })
  createdAt: Date;

  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-05-31T21:00:40.000Z',
  })
  updatedAt: Date;
}
