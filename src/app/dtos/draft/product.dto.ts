import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsNumber, IsString } from 'class-validator';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'Product' })
export class ProductDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 24,
  })
  partnerId: number;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 8,
    description: 'product id',
  })
  id: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'APE',
    description: 'product initial',
  })
  initial: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Acidentes Pessoais',
    description: 'product name',
  })
  name: string;
}
