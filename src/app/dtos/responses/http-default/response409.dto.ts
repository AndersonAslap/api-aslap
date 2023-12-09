import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: '409 Conflict' })
export class Response409Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Valor solicitado já existente',
    description:
      'Utilizado quando está tentando adicionar algo que já foi adicionado anteriormente',
    required: true,
  })
  message: string;
}
