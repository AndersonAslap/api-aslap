import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Retorno Proposta Combo' })
export class ResponseProposalComboDto {
  @ApiPropertyOptional({
    type: String,
    example: 'APE',
    description:
      'Nome do produto (CDIG - Carteira Digital | APE - Acidentes Pessoais | IT - Impedimento ao Trabalho)',
  })
  product: string;

  @ApiPropertyOptional({
    type: String,
    example: '($guid)',
    description: 'Código da proposta a ser processada',
  })
  ticket: string;

  @ApiPropertyOptional({
    type: Number,
    example: 50.05,
    description: 'Valor da proposta',
  })
  amount: number;

  @ApiPropertyOptional({
    type: Number,
    example: 3,
    description:
      'Tipo da Proposta, necessário informar no momento do pagamento pela Olga Seguros',
  })
  typeId: number;
}
