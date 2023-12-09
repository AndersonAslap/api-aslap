import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiSchema } from '../../app/decorators/ApiSchema.decorator';

// TODO adicionar nomeclatura correta
@ApiSchema({ name: 'Veículo' })
export class VehicleDto {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'AWE12D21',
  })
  licensePlate: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'AWD1231ASD',
  })
  renavam: string;
}
