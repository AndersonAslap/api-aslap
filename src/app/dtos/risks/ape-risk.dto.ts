import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { BeneficiaryDto } from '../beneficiary.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { APECoverageDto } from '../coverages/ape-coverage.dto';

@ApiSchema({ name: 'Risco APE (Acidentes Pessoais)' })
export class APERiskDto {
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => BeneficiaryDto)
  @ApiProperty({ type: [BeneficiaryDto] })
  beneficiaries: BeneficiaryDto[];

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => APECoverageDto)
  @ApiProperty({ type: [APECoverageDto] })
  coverages: APECoverageDto[];
}
