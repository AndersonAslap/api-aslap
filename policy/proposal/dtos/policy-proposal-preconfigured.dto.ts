import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { BeneficiaryDto } from '../../../app/dtos/beneficiary.dto';
import { EquipmentFieldsDto } from '../../../app/dtos/draft/equipment-fields.dto';
import { ParticipantsDto } from '../../../app/dtos/draft/participant.dto';
import { CustomerDto } from '../../../customer/dtos/customer.dto';

@ApiSchema({ name: 'BeneficiariesFields' })
class BeneficiariesFields {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @ApiProperty({
    type: [BeneficiaryDto],
  })
  beneficiaries: BeneficiaryDto[];
}

@ApiSchema({ name: 'EquipmentFields' })
class EquipmentFields {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => EquipmentFieldsDto)
  @ApiProperty({ type: EquipmentFieldsDto, required: true })
  equipment: EquipmentFieldsDto;
}

@ApiSchema({ name: 'ParticipantsFields' })
class ParticipantsFields {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @ApiProperty({
    type: [ParticipantsDto],
  })
  participants: ParticipantsDto[];
}

type Risks = BeneficiariesFields | EquipmentFields | ParticipantsFields;

@ApiSchema({ name: 'PolicyProposalPreconfigured' })
@ApiExtraModels(BeneficiariesFields, EquipmentFields, ParticipantsFields)
export default class PolicyProposalPreconfiguredDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'Código da campanha de venda Olga Seguros, caso haja algum código',
    required: true,
  })
  campaignId: number;

  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48.000Z',
    description: 'Data de inicio de vigência',
  })
  effectiveDate: Date;

  @ApiPropertyOptional({
    type: Date,
    example: '2021-04-22T18:36:48.000Z',
    description: 'Data de Fim de vigência',
  })
  expiryDate: Date;

  @ApiPropertyOptional({
    type: () => Object,
    description:
      'Dado customizado para ser reutilizado no reboarding (customer integration)',
  })
  reboarding: object;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, required: true })
  customer: CustomerDto;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => BeneficiariesFields)
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(BeneficiariesFields) },
        { $ref: getSchemaPath(EquipmentFields) },
        { $ref: getSchemaPath(ParticipantsFields) },
      ],
    },
    required: true,
    description: 'Riscos a serem cobertos',
  })
  risks: Risks[];
}
