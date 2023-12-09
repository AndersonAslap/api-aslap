import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { VehicleDto } from '../vehicle.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ITCoverageDto } from '../coverages/it-coverage.dto';

@ApiSchema({ name: 'Telefone' })
class PhoneDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '1231231SDFSA',
  })
  imei: string;
}

@ApiSchema({ name: 'Risco IT (Impedimento ao Trabalho)' })
export class ITRiskDto {
  @ValidateNested()
  @Type(() => VehicleDto)
  @ApiPropertyOptional({ type: VehicleDto })
  vehicle: VehicleDto;

  @ValidateNested()
  @Type(() => PhoneDto)
  @ApiPropertyOptional({ type: PhoneDto })
  phone: PhoneDto;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => ITCoverageDto)
  @ApiProperty({ type: [ITCoverageDto] })
  coverages: ITCoverageDto[];
}
