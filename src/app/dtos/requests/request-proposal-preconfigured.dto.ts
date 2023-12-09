import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsDefined,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerDto } from '../draft/customer.dto';
@ApiSchema({ name: 'Reboarding' })
class ReboardingDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description:
      'Dado customizado para ser reutilizado no reboarding (customer integration)',
  })
  description: string;
}

@ApiSchema({ name: 'Risco do combo' })
class ComboRiskDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Código do combo de cotações da campanha de vendas.',
  })
  comboId: number;
}

@ApiSchema({ name: 'Proposta com Combo' })
export class RequestProposalPreconfiguredDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '1231231231',
    description: 'Id de referencia do parceiro',
  })
  referenceId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda **Olga Seguros**, caso haja algum código',
    required: true,
  })
  campaignId: number;

  @IsDateString()
  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48',
    description: 'Data de inicio de vigência',
  })
  effectiveDate: Date;

  @IsDateString()
  @ApiPropertyOptional({
    type: Date,
    example: '2022-04-22T18:36:48',
    description: 'Data de Fim de vigência',
  })
  expiryDate: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => ReboardingDto)
  @ApiProperty({ type: ReboardingDto })
  reboarding: ReboardingDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, required: true })
  customer: CustomerDto;

  @IsDefined()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => ComboRiskDto)
  @ApiProperty({ type: [ComboRiskDto], required: true })
  risks: ComboRiskDto[];
}
