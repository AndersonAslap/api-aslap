import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PolicyProposalService } from './policy-proposal.service';
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
import { PolicyProposalDto } from './dtos/policy-proposal.dto';
import { ResponsePolicyDto } from '../../app/dtos/responses/response-policy.dto';
import { Response422SimpleDto } from '../../app/dtos/responses/http-default/response422simple.dto';
import { ResponseProposalComboDto } from '../../app/dtos/responses/response-proposal-combo.dto';
import PolicyProposalPreconfiguredDTO from './dtos/policy-proposal-preconfigured.dto';
import { PartnerService } from '../../partner/partner.service';
import { PolicyQuoteService } from '../quote/policy-quote.service';

@ApiTags('Proposta')
@Controller('/policy/proposal')
export class PolicyProposalController {
  constructor(
    private readonly policyProposalService: PolicyProposalService,
    private readonly partnerService: PartnerService,
    private readonly policyQuoteService: PolicyQuoteService,
  ) {}


  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gera uma proposta de apólice',
    description: 'Realiza a geração de uma proposta de apólice.',
  })
  @ApiQuery({
    name: 'partnerId',
    type: String,
    description: 'partner id Olga Seguros',
  })
  @ApiBody({ type: PolicyProposalDto })
  @ApiOkResponse({ type: ResponsePolicyDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async create(
    @Query('partnerId') partnerId: string,
    @Body() dto: PolicyProposalDto,
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

    const isValidQuote = await this.policyQuoteService.validateQuoteId(
      dto.quoteId,
    );

    if (!isValidQuote) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          quoteId: 'Quote not found',
        },
      });
    }

    const foundedProposal =
      await this.policyProposalService.findProposalByQuoteId(dto.quoteId);

    if (foundedProposal) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          quoteId: 'There is already a proposal with this quoteId',
        },
      });
    }

    const proposal = await this.policyProposalService.create({
      dto,
      partnerId,
    });
    return { proposalId: proposal.id, customerId: proposal.customerId };
  }

  @ApiExcludeEndpoint()
  @Post('preconfigured')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gera uma proposta de apólice com base em um combo.',
    description: 'Realiza a geração de uma proposta de apólice.',
  })
  @ApiOkResponse({ type: ResponsePolicyDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async createPreconfigured(@Body() dto: PolicyProposalPreconfiguredDTO) {
    const result = await this.policyProposalService.createPreconfigured(dto);
    return result;
  }

  @ApiExcludeEndpoint()
  @Post('combo')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gera um combo de proposta.',
    description: 'Realiza a geração de um proposta de apólice.',
  })
  @ApiOkResponse({ type: [ResponseProposalComboDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async createCombo(@Body() dto: any) {
    const result = await this.policyProposalService.createCombo(dto);
    return result;
  }
}
