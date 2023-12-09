import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'Retorno do apólice a ser processado' })
export class ResponsePolicyIssuePreconfiguredDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Código da apólice a ser processada',
  })
  ticket: string;
}
