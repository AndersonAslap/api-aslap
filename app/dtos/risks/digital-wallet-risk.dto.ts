import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { DigitalWalletDto } from '../digital-wallet.dto';
import { Type } from 'class-transformer';
import { DigitalWalletCoverageDto } from '../coverages/digital-wallet-coverage.dto';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Risco de Carteira Digital' })
export class DigitalWalletRiskDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DigitalWalletDto)
  @ApiPropertyOptional({
    type: DigitalWalletDto,
    description: 'Dados da carteira digital',
  })
  digitalWallet: DigitalWalletDto;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => DigitalWalletCoverageDto)
  @ApiProperty({ type: [DigitalWalletCoverageDto] })
  coverages: DigitalWalletCoverageDto[];
}
