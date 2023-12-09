import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { FinanceSubscriptionService } from './finance-subscription.service';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response422SimpleDto } from '../../app/dtos/responses/http-default/response422simple.dto';
import { ResponseGetSubscriptionChargeDto } from '../../app/dtos/responses/response-get-subscription-charge.dto';
import { RequestPutSubscriptionChargeDto } from '../../app/dtos/requests/request-put-subscription-charge.dto';

@ApiTags('Financeiro')
@Controller('/finance/subscription')
export class FinanceSubscriptionController {
  constructor(
    private readonly financeSubscriptionService: FinanceSubscriptionService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('charge')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtenção de parcelas.',
  })
  @ApiQuery({
    name: 'statusId',
    type: Number,
    required: false,
    description: 'Filtro de parcelas com determinado status.',
  })
  @ApiQuery({
    name: 'subscriptionId',
    type: Number,
    required: false,
    description: 'Id da assinatura',
  })
  @ApiOkResponse({
    type: [ResponseGetSubscriptionChargeDto],
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getInstallments(
    @Query('statusId') statusId: number,
    @Query('subscriptionId') subscriptionId: number,
  ) {
    const result = await this.financeSubscriptionService.getInstallments({
      statusId,
      subscriptionId,
    });
    return result;
  }

  @ApiExcludeEndpoint()
  @Put('charge')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualização de parcela.',
  })
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async updateInstallment(@Body() dto: RequestPutSubscriptionChargeDto) {
    await this.financeSubscriptionService.updateInstallment(dto);
    return;
  }
}
