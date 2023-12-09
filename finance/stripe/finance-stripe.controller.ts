import { Body, Controller, Post } from '@nestjs/common';
import { FinanceStripeService } from './finance-stripe.service';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ResponsePolicyDto } from '../../app/dtos/responses/response-policy.dto';
import { Response422SimpleDto } from '../../app/dtos/responses/http-default/response422simple.dto';
import { RequestCreditCardDto } from '../../app/dtos/requests/request-credit-card.dto';

@ApiTags('Apólice')
@Controller('/finance/stripe')
export class FinanceStripeController {
  constructor(private readonly financeStripeService: FinanceStripeService) {}

  @ApiExcludeEndpoint()
  @Post('credit-card')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Cadastra o cartão de crédito, assim realizando o pagamento e emissão da apólice',
    description:
      'Cadastra o cartão de crédito, assim realizando o pagamento e emissão da apólice.',
  })
  @ApiOkResponse({ type: ResponsePolicyDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async create(@Body() dto: RequestCreditCardDto) {
    const result = await this.financeStripeService.create(dto);
    return result;
  }
}
