import { ApiProperty } from '@nestjs/swagger';

class CampaignDto {
  @ApiProperty({ description: 'Descrição da campanha de venda' })
  description: string;

  @ApiProperty({ description: 'Tipo da campanha de venda', type: Number })
  type: number;

  @ApiProperty({ description: 'Exemplo da campanha de venda', type: Number })
  example: number;
}

class InsuredCoverageDto {
  @ApiProperty({ description: 'Descrição da cobertura' })
  description: string;

  @ApiProperty({ description: 'Carência da cobertura' })
  carencia: string;

  @ApiProperty({ description: 'Código ID da cobertura' })
  codigoID: string;

  @ApiProperty({ description: 'Valor máximo da cobertura' })
  valueMax: number;

  @ApiProperty({ description: 'Valor mínimo da cobertura' })
  valueMin: number;
}

export class InputCreateProductDTO {
  @ApiProperty({ description: 'ID do fornecedor', example: 'f4979895-f04e-45bc-87f5-0f36ec25a862' })
  providerId: string;

  @ApiProperty({ description: 'Nome do produto' })
  name: string;

  @ApiProperty({ description: 'Tipo do produto' })
  type: string;

  @ApiProperty({ description: 'Código do produto' })
  codigo: string;

  @ApiProperty({ description: 'Campanha associada ao produto', type: CampaignDto })
  campaign: CampaignDto;

  @ApiProperty({ description: 'Lista de coberturas seguradas', type: [InsuredCoverageDto] })
  insuredCoverages: InsuredCoverageDto[];

  @ApiProperty({ description: 'Preço do produto' })
  price: number;

  @ApiProperty({ description: 'Data de início da vigência do produto' })
  virgenciaInicio: string;

  @ApiProperty({ description: 'Data de término da vigência do produto' })
  virgenciaFinal: string;

  @ApiProperty({ description: 'Franquia do produto' })
  franquia: number;

  @ApiProperty({ description: 'Código SUSEP do produto' })
  codigoSusep: string;

  @ApiProperty({ description: 'Valor do IOF do produto' })
  iof: number;
}
