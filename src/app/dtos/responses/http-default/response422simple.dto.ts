import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: '422 unprocessable entity simple' })
export class Response422SimpleDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Campo obrigatório',
    description: 'Utilizado quando possui apenas 1 campo inválido',
  })
  message: string;
}
