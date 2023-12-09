import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';
import { ProductResponseDto } from './response-product.dto';

@ApiSchema({ name: 'Produtos do parceiro' })
export class ResponseProductPartnerListDto {
  @ApiPropertyOptional({
    type: String,
    example: 'cea1e9da-3c6e-4a6a-8f54-297cdeeede9e',
    description: 'Id do parceiro Olga Seguros',
  })
  partnerId: string;

  @ApiPropertyOptional({
    type: [ProductResponseDto],
  })
  products: ProductResponseDto[];
}
