import { Controller, Get } from '@nestjs/common';
import { EnumService } from './enum.service';
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
import { Response422SimpleDto } from '../app/dtos/responses/http-default/response422simple.dto';
import { CardFlagsDto } from '../app/dtos/draft/card-flags.dto';

@Controller('/enum')
export class EnumController {
  constructor(private readonly enumService: EnumService) {}

  @ApiExcludeEndpoint()
  @ApiTags('Bandeiras Cartões')
  @Get('card-flags')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtem lista de bandeiras de cartões',
    description: 'Obtem lista de bandeiras de cartões',
  })
  @ApiOkResponse({ type: [CardFlagsDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getCardFlags() {
    const result = await this.enumService.getCardFlags();
    return result;
  }
}
