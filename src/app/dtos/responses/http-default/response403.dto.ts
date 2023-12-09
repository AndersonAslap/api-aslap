import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../../../decorators/ApiSchema.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: '403 Forbbiden' })
export class Response403Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Forbidden',
    description: 'Mensagem de erro',
    required: true,
  })
  message: string;
}
