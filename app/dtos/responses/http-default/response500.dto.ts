import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../../app/decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: '500 internal server error' })
export class Response500Dto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Erro interno',
    description:
      'Utilizado quando acontece algum erro interno e o request pode ser tentado novamento',
  })
  message: string;
}
