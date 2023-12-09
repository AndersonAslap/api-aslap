import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Coberturas com valor anual' })
export class ResponseQuoteDto {
  @ApiPropertyOptional({
    type: String,
    example: 'd81bfac3-90d6-4777-b8dd-db487f06cc85',
    description: 'Id da cotação',
  })
  quoteId: string;

  // @ApiPropertyOptional({
  //   type: String,
  //   example: 'Morte Acidental',
  //   description: 'Nome da cobertura',
  // })
  // name: string;

  // @ApiPropertyOptional({
  //   type: String,
  //   description: 'Descrição da cobertura',
  // })
  // information: string;

  // @ApiPropertyOptional({
  //   type: String,
  //   example: 'C101112',
  //   description: 'Código da cobertura eBao',
  // })
  // eBaoCode: string;

  // @ApiPropertyOptional({
  //   type: Number,
  //   example: 1700.01,
  //   description: 'Valor segurado',
  // })
  // sumInsured: number;

  // @ApiPropertyOptional({
  //   type: Number,
  //   example: 3,
  //   description: 'Diarias seguradas',
  // })
  // daily: number;

  // @ApiPropertyOptional({
  //   type: Number,
  //   example: 168.01,
  //   description: 'Valor anual da cobertura',
  // })
  // value: number;

  // @ApiPropertyOptional({
  //   type: Number,
  //   example: 16.8,
  //   description: 'Valor mensal da cobertura',
  // })
  // valueMonthly: number;

  // @ApiPropertyOptional({
  //   type: Boolean,
  //   example: true,
  //   description: 'Indica cobertura obrigatória',
  // })
  // isRequired: boolean;
}
