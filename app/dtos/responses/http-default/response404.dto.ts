import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../../app/decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: '404 Not Found' })
export class Response404Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Not Found',
    description: 'Não encontrado',
    required: true,
  })
  message: string;
}
