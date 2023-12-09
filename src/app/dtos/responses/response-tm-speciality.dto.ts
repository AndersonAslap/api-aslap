import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Retorno Especialidades' })
export class ResponseTMSpecialityDto {
  @ApiPropertyOptional({
    type: Number,
    example: 4,
  })
  id: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Clínica Medica',
  })
  description: string;
}
