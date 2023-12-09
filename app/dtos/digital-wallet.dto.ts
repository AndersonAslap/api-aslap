import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { CreditCardDto } from './credit-card.dto';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Carteira Digital' })
export class DigitalWalletDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Vinicius Dantas',
    description: 'Nome do cliente',
  })
  walletName: string;

  @IsString()
  @Transform(({ value }) => value.replace(/\./g, '').replace(/\-/g, ''))
  @ApiPropertyOptional({
    type: String,
    example: '999.999.999-99',
    description: 'CPF do cliente',
  })
  walletCPF: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '123123123123',
    description: 'Número da conta do cliente',
  })
  bankAccountNo: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '123',
    description: 'Número da agencia do cliente',
  })
  agencyNo: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '456',
    description: 'Codigo do banco',
  })
  bankCode: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreditCardDto)
  @ApiPropertyOptional({
    type: CreditCardDto,
    description: 'Dados do cartão de crédito',
  })
  creditCard: CreditCardDto;
}
