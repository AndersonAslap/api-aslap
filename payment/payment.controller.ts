import { Controller, Post } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('Pagamentos')
@Controller('payment')
export class PaymentController {

    @Post()
    @ApiOperation({
        summary: 'Retorna a url do checkout',
        description: 'Retorna a url do checkout',
    })
    //@ApiBody({ type: any })
    //@ApiOkResponse({ type: ResponseProductPartnerListDto, description: 'OK' })
    @ApiUnauthorizedResponse({ description: 'Não autorizado' })
    //@UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    async createProvider() {
        return {
            checkoutUrl: 'https://stripe.com/checkout'
        };
    }
}