import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  PolicyQuoteService,
  RequestPreConfiguratedQuotesType,
} from './policy-quote.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequestQuotePreconfiguredDto } from '../../app/dtos/requests/request-quote-preconfigured.dto';
import { RequestQuotePreconfiguredByRangeDto } from '../../app/dtos/requests/request-quote-preconfigured-by-range.dto';
import { RequestQuoteCalculateListDto } from '../../app/dtos/requests/request-calculate-list.dto';
import { Response422SimpleDto } from '../../app/dtos/responses/http-default/response422simple.dto';
import { ResponseQuotePreconfiguredDto } from '../../app/dtos/responses/response-quote-preconfigured.dto';
import { ResponseQuoteDto } from '../../app/dtos/responses/response-quote.dto';
import { ResponseQuoteCalculateDto } from '../../app/dtos/responses/response-calculate-list.dto';
import { ResponseCalculateRangeListDto } from '../../app/dtos/responses/response-calculate-range-list.dto';
import { RequestQuoteCalculateRangeListDto } from '../../app/dtos/requests/request-calculate-range-list.dto';
import { CreateQuoteDto } from './dtos/createQuote.dto';
import { ProductService } from '../../product/product.service';
import { PartnerService } from '../../partner/partner.service';

@ApiTags('Cotação')
@Controller('/policy/quote')
@ApiExtraModels(
  RequestQuotePreconfiguredDto,
  RequestQuotePreconfiguredByRangeDto,
)
export class PolicyQuoteController {
  constructor(
    private readonly policyQuoteService: PolicyQuoteService,
    private readonly partnerService: PartnerService,
    private readonly productService: ProductService,
  ) {}

  @ApiExcludeEndpoint()
  @Post('preconfigured')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtem uma lista de combos com valores predefinidos',
    description:
      'Obtem uma lista de coberturas com seus valores mensais e anuais de acordo com o produto enviado.',
  })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(RequestQuotePreconfiguredDto) },
        { $ref: getSchemaPath(RequestQuotePreconfiguredByRangeDto) },
      ],
    },
    description: 'Olhar a **Model** para ver os objetos aceitos.',
  })
  @HttpCode(200)
  @ApiOkResponse({
    type: [ResponseQuotePreconfiguredDto],
    description: 'Get',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getPreConfiguratedQuotes(
    @Body() dto: RequestPreConfiguratedQuotesType,
  ) {
    const result = await this.policyQuoteService.getPreConfiguratedQuotes(dto);
    return result;
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtem uma nova cotação',
    description: 'Cria e retorna uma nova cotação.',
  })
  @ApiQuery({
    name: 'partnerId',
    type: String,
    description: 'partner id Olga Seguros',
  })
  @ApiBody({ type: CreateQuoteDto })
  @ApiOkResponse({ type: ResponseQuoteDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async createQuote(
    @Query('partnerId') partnerId: string,
    @Body() dto: CreateQuoteDto,
  ) {
    if (!partnerId)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          partnerId: 'partnerId is mandatory (query)',
        },
      });
    const isValidPartner = await this.partnerService.validatePartnerId(
      partnerId,
    );

    if (!isValidPartner) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          partnerId: 'Partner not found',
        },
      });
    }
    const isValidProduct = await this.productService.validateProductId(
      dto.productId,
    );

    if (!isValidProduct) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          productId: 'Product not found',
        },
      });
    }

    const quote = await this.policyQuoteService.createQuote({
      dto,
      partnerId,
    });
    return { quoteId: quote.id };
  }

  @ApiExcludeEndpoint()
  @Post('calculate')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcula o valor da cobertura por mês',
    description:
      'Calcula o valor da cobertura por mês de acordo com a porcentagem do aparelho coberto, frânquia e o total de parcelas',
  })
  @ApiBody({
    type: [RequestQuoteCalculateListDto],
  })
  @HttpCode(200)
  @ApiOkResponse({ type: [ResponseQuoteCalculateDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async calculateQuoteByMonth(@Body() dto: [RequestQuoteCalculateListDto]) {
    const result = await this.policyQuoteService.calculateQuoteByMonth(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Post('calculate/range')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcula o valor das coberturas com base no valor do range',
    description: 'Calcula o valor das coberturas com base no valor do range',
  })
  @HttpCode(200)
  @ApiOkResponse({ type: [ResponseCalculateRangeListDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async calculateQuoteRange(@Body() dto: RequestQuoteCalculateRangeListDto) {
    const result = await this.policyQuoteService.calculateQuoteRange(dto);
    return result;
  }
}
