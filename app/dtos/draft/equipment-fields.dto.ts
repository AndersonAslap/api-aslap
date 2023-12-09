import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'EquipmentFieldsDto' })
export class EquipmentFieldsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'ALCATEL',
    required: true,
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'IDLE 4',
    required: true,
  })
  model: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: '321654987',
  })
  imei: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1200.0,
  })
  estimatedValue: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'O aparelho possui mais de 1 ano',
  })
  moreThanAYear: boolean;

  @IsString()
  @ApiProperty({
    type: String,
    example: '123132',
    description: 'Número da nota fiscal',
  })
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '+5511999999999',
    required: true,
    description: 'Número do telefone que está sendo coberto',
  })
  phone: string;
}
