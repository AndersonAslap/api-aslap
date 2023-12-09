import { Body, Controller, Post } from '@nestjs/common';
import { PolicyService } from './policy.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RequestPolicyDto } from '../app/dtos/requests/request-policy.dto';
import { ResponsePolicyDto } from '../app/dtos/responses/response-policy.dto';
import { Response422SimpleDto } from '../app/dtos/responses/http-default/response422simple.dto';
// import { RequestProposalPreconfiguredDto } from 'src/app/dtos/requests/request-proposal-preconfigured.dto';
import { RequestCancelPolicyDto } from './dtos/request-cancel-policy.dto';
import { ResponseCancelPolicyDto } from './dtos/response-cancel-policy.dto';

@ApiTags('Apólice')
@Controller('/policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Realiza a emissão da apólice, visto que o pagamento dela para a Olga Seguros já foi ou deverá ser repassado.',
    description:
      'Realiza a emissão da apólice, visto que o pagamento dela para a Olga Seguros já foi ou deverá ser repassado.',
  })
  @ApiOkResponse({ type: ResponsePolicyDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async issue(@Body() dto: RequestPolicyDto) {
    const result = await this.policyService.issue(dto);
    return result;
  }

  // @Post('issue-preconfigured')
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'Realiza a emissão da apólice emissão da apólice.',
  //   description: 'Realiza a emissão da apólice emissão da apólice.',
  // })
  // @ApiOkResponse({ type: ResponsePolicyDto, description: 'Ok' })
  // @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  // @ApiUnprocessableEntityResponse({
  //   type: Response422SimpleDto,
  //   description: 'Entidade não processável',
  // })
  // @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  // async issuePreconfigured(@Body() dto: RequestProposalPreconfiguredDto) {
  //   const result = await this.policyService.issuePreconfigured(dto);
  //   return result;
  // }

  @ApiExcludeEndpoint()
  @Post('cancellation')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Realiza o cancelamento de uma apólice.',
    description: 'Realiza o cancelamento de uma apólice.',
  })
  @ApiOkResponse({
    type: ResponseCancelPolicyDto,
    description: 'Cancelamento realizado.',
  })
  @ApiNotFoundResponse({ description: 'Apólice não encontrada' })
  @ApiConflictResponse({ description: 'Apólice já está cancelada' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async cancelPolicy(@Body() dto: RequestCancelPolicyDto) {
    const curOffDate = await this.policyService.cancelPolicy(dto);
    return curOffDate;
  }
}
