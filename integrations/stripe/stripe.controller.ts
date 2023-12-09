import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('stripe')
export class StripeController {
  @ApiExcludeEndpoint()
  @Get('token')
  token() {
    return {
      token: process.env.STRIPE_KEY,
    };
  }
}
