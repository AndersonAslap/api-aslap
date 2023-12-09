import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PartnerService } from './partner.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {

    constructor(
        private partnerService: PartnerService
    ){}

    @Get()
    @ApiOperation({
        summary: 'Obtem um partner',
        description: 'Obtem um partner',
    })
    //@ApiBody({ type: any })
    //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
    @ApiUnauthorizedResponse({ description: 'Não autorizado' })
    //@UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiQuery({
        name: 'id',
        type: String,
        description: 'Informar o ID do partner.',
        required: true,
      })
    async getPartnerById(
        @Query('id') id: string
    ) {
        const partner = await this.partnerService.getById(id);
        return {
            partner
        };
    }

    @Post()
    @ApiOperation({
        summary: 'Cadastra um partner',
        description: 'Cadastra um partner',
    })
    //@ApiBody({ type: any })
    //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
    @ApiUnauthorizedResponse({ description: 'Não autorizado' })
    //@UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    async createProduct(
        @Body() input: any
    ) {
        await this.partnerService.create(input);
        return {
            data: input,
        };
    }
}
