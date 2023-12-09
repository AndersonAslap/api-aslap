import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'Retorno Proposta' })
export class ResponseProposalDto {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Código da proposta a ser processada',
  })
  ticket: string;
}
