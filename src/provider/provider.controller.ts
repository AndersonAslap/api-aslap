import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProviderService } from './provider.service';

@ApiTags('Provedores')
@Controller('providers')
export class ProviderController {

    constructor(
        private providerService: ProviderService
    ){}

    @Get()
    @ApiOperation({
        summary: 'Obtem um provider',
        description: 'Obtem um provider',
    })
    //@ApiBody({ type: any })
    //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
    @ApiUnauthorizedResponse({ description: 'Não autorizado' })
    //@UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiQuery({
        name: 'id',
        type: String,
        description: 'Informar o ID do provider.',
        required: true,
      })
    async getProviderById(
        @Query('id') id: string
    ) {
        const provider = await this.providerService.getById(id);
        return {
            provider
        };
    }

    @Post()
    @ApiOperation({
        summary: 'Cadastra um provider',
        description: 'Cadastra um provider',
    })
    //@ApiBody({ type: any })
    //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
    @ApiUnauthorizedResponse({ description: 'Não autorizado' })
    //@UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    async createProvider(
        @Body() input: any
    ) {
        const providerId = await this.providerService.create(input);
        return {
            providerId
        };
    }

}
