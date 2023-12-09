import { Body, Controller, Post } from '@nestjs/common';
import { EndorsementService } from './endorsement.service';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cancelamento')
@ApiExcludeController()
@Controller('/endorsement')
export class EndorsementController {
  constructor(private readonly endorsementService: EndorsementService) {}

  @Post('cancel')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Realiza o cancelamento da apólice',
    description:
      'Realiza o cancelamento da apólice, validando se é um cancelamento desde o inicio da vigência ou a partir da próxima mensalidade.',
  })
  async cancel(@Body() dto: any) {
    const result = await this.endorsementService.cancel(dto);
    return result;
  }

  @Post('cancellation-request')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Realiza a solicitação do cancelamento de uma apólice.',
    description: 'Realiza a solicitação do cancelamento de uma apólice.',
  })
  async cancellationRequest(@Body() dto: any) {
    const result = await this.endorsementService.cancellationRequest(dto);
    return result;
  }
}
