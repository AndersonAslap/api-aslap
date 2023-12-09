import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'Retorno do Pagamento a ser processado' })
export class ResponseCreditCardDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Código do pagamento a ser processada',
  })
  ticket: string;
}
