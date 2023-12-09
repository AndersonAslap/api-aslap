import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FinancePaymentMethodService } from './finance-payment-method.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PaymentMethodDto } from './dtos/payment-method.dto';
import { Response422SimpleDto } from '../../app/dtos/responses/http-default/response422simple.dto';
import { CreatePaymentMethodV2RequestDto } from './dtos/create-payment-method-v2request.dto';
import { FindPaymentMethodRequestDto } from './dtos/find-payment-method-request.dto';
import { ListPaymentMethodResponseDto } from './dtos/list-payment-method-response.dto';
import { ReorderPaymentMethodRequestV2Dto } from './dtos/reorder-payment-method-request-v2.dto';
import { ListPaymentMethodRequestDto } from './dtos/list-payment-method-request.dto';
import { PaymentGatewayDto } from './dtos/payment-gateway.dto';

@ApiTags('Meio de Pagamento')
@Controller('/finance/payment-method')
export class FinancePaymentMethodController {
  constructor(
    private readonly financePaymentMethodService: FinancePaymentMethodService,
  ) {}

  @ApiExcludeEndpoint()
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cria um meio de pagamento',
    description:
      'Realiza a criação de um meio de pagamento baseado em um provedor (pagarme ou picpay por exemplo) e um document (document = CPF). Um mesmo usuário pode ter vários meios de pagamento.',
  })
  @ApiCreatedResponse({ type: PaymentMethodDto, description: 'Created' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiConflictResponse({ description: 'Valor solicitado já existente' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async create(@Body() dto: CreatePaymentMethodV2RequestDto) {
    const result = await this.financePaymentMethodService.create(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Post('find')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna um meio de pagamento para um dado usuário',
    description: 'Retorna um meio de pagamento para um dado usuário',
  })
  @HttpCode(200)
  @ApiOkResponse({ type: PaymentMethodDto, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async find(@Body() dto: FindPaymentMethodRequestDto) {
    const result = await this.financePaymentMethodService.find(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Post('list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista os meios de pagamento de um usuário',
    description: 'Lista dos meios de pagamento de um usuário.',
  })
  @ApiOkResponse({ type: ListPaymentMethodResponseDto, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async list(@Body() dto: ListPaymentMethodRequestDto) {
    const result = await this.financePaymentMethodService.list(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Put('reorder')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Reorderna os meios de pagamento para um dado usuário',
    description: 'Reorderna os meios de pagamento para um dado usuário',
  })
  @ApiOkResponse({ type: [PaymentMethodDto], description: 'OK' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async reorder(@Body() dto: ReorderPaymentMethodRequestV2Dto) {
    const result = await this.financePaymentMethodService.reOrder(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Post('delete')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove um meio de pagamento para um dado usuário',
    description: 'Remove um meio de pagamento para um dado usuário',
  })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async remove(@Body() dto: FindPaymentMethodRequestDto) {
    const result = await this.financePaymentMethodService.remove(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Get('payment-gateway')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Retorna uma lista de meios de pagamento associados a uma campanha',
    description:
      'Retorna uma lista de meios de pagamento associados a uma campanha (se campanha é fornecido, caso contrário retornará todos as formas)',
  })
  @ApiQuery({
    name: 'campaignId',
    type: String,
    required: true,
    description: 'Campaign Id',
  })
  @ApiOkResponse({ type: [PaymentGatewayDto], description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async paymentGateway(@Query('campaignId') campaignId: string) {
    if (!campaignId)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          campaignId: 'campaignId is mandatory (query)',
        },
      });
    const result = await this.financePaymentMethodService.paymentGateway(
      campaignId,
    );
    return result;
  }
}
