import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Bandeiras Cartões' })
export class CardFlagsDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Mastercard',
    description: 'Nome da Bandeira',
  })
  name: string;

  @ApiPropertyOptional({
    type: Number,
    example: 11,
    description: 'Código da Bandeira no EBAO',
  })
  code: number;
}
