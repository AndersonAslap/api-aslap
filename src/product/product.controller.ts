import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response422SimpleDto } from '../app/dtos/responses/http-default/response422simple.dto';
import { ResponseProductPartnerListDto } from './dtos/response-product-partner-list.dto';
import { ResponseProductCoverageDto } from './dtos/response-product-coverage.dto';
import { PartnerService } from '../partner/partner.service';
import { ProductResponseDto } from './dtos/response-product.dto';
import { AuthGuard } from 'src/app/auth/guards/AuthGuard';
import { InputCreateProductDTO } from './dtos/input-create-product.dto';

@ApiTags('Produto')
@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly partnerService: PartnerService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('common')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtem a lista de produtos',
    description: 'Obtem uma lista de produtos da Olga Seguros',
  })
  @ApiOkResponse({ type: [ProductResponseDto], description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getCommon() {
    const result = await this.productService.getCommon();
    return result;
  }

  @ApiExcludeEndpoint()
  @Get('common/coverage')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtem uma lista de coberturas do produto',
    description: 'Obtem uma lista de coberturas do produto',
  })
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'Informar o ID do produto.',
    required: true,
  })
  @ApiOkResponse({ type: [ResponseProductCoverageDto], description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getCommonCoverage(@Query('id') id: string) {
    if (!id)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'id is mandatory (query)',
        },
      });
    const result = await this.productService.getCommonCoverage(id);
    return result;
  }

  @Get('partner/list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtém produtos do parceiro',
    description: 'Obtém produtos do parceiro',
  })
  @ApiQuery({
    name: 'partnerId',
    type: String,
    description: 'partner id Olga Seguros',
  })
  @ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getPartnerList(@Query('partnerId') partnerId: string) {
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

    const result = await this.productService.getPartnerList(partnerId);
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Cadastra os produtos do parceiro',
    description: 'Cadastra os produtos do parceiro',
  })
  @ApiBody({ type: InputCreateProductDTO })
  //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  //@UseGuards(AuthGuard)
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async createProduct(
    @Body() input: InputCreateProductDTO
  ) {
    return {
      data: input,
    };
  }
}
