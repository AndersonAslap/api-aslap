import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@ApiSchema({ name: 'Agendamento' })
export class RequestTMScheduleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'POTM0000123',
    required: true,
  })
  policyId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  participantId: number;

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
    example: '5511999999999',
    required: true,
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Muita dor de cabeça',
    description: 'Motivo da consulta detalhado.',
    required: true,
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 233,
    required: true,
  })
  reasonId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 4,
    required: true,
  })
  specialityId: number;
}
