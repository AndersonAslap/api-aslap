import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Criação de cotação' })
export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '546799e9-8843-4cca-8b49-92ac4388a54f',
    description: 'Id do produto escolhido',
    required: true,
  })
  productId: string;
}
