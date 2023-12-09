import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsNumber } from 'class-validator';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'PartnerProduct' })
export class PartnerProductDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 4,
  })
  partnerId: number;

  // TODO products
  products: undefined;
}
