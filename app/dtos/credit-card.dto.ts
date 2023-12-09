import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Cartão de crédito' })
export class CreditCardDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '5141460232783857',
    description: 'Número do cartão de crédito',
  })
  number: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: '5141460232783857',
    description: 'Código da bandeira do cartão de crédito',
  })
  bandeiraCode: string;
}
