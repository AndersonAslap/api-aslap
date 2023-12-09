import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { PolicyCancellationReasonEnum } from '../../app/enums/PolicyCancellationReason.enum';
import { PolicyPaymentProviderEnum } from '../../app/enums/PolicyPaymentProvider.enum';
import { PolicyStatusEnum } from '../../app/enums/PolicyStatus.enum';

export class CreatePolicyDto {
  @IsNotEmpty()
  @IsString()
  certificateNumber: string;

  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsOptional()
  @IsString()
  @Matches(
    `^${Object.values(PolicyPaymentProviderEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  paymentProvider?: PolicyPaymentProviderEnum;

  @IsOptional()
  @IsString()
  @Matches(
    `^${Object.values(PolicyStatusEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  status?: PolicyStatusEnum;

  @IsOptional()
  @IsDateString()
  pauseDateStart?: Date;

  @IsOptional()
  @IsDateString()
  pauseDateEnd?: Date;

  @IsOptional()
  @IsDateString()
  cancellationDate?: Date;

  @IsOptional()
  @IsString()
  @Matches(
    `^${Object.values(PolicyCancellationReasonEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  cancellationReason?: PolicyCancellationReasonEnum;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  partnerId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;
}
