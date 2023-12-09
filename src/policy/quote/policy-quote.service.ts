import { Injectable } from '@nestjs/common';
import { RequestQuotePreconfiguredByRangeDto } from '../../app/dtos/requests/request-quote-preconfigured-by-range.dto';
import { RequestQuotePreconfiguredDto } from '../../app/dtos/requests/request-quote-preconfigured.dto';

import * as preconfigurated_Mock from './mocks/preconfigurated.json';
import * as calculateQuote_Mock from './mocks/calculateQuote.json';
import { CreateQuoteDto } from './dtos/createQuote.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { quote } from '@prisma/client';

export type RequestPreConfiguratedQuotesType =
  | RequestQuotePreconfiguredDto
  | RequestQuotePreconfiguredByRangeDto;

@Injectable()
export class PolicyQuoteService {
  constructor(private prisma: PrismaService) {}

  public async validateQuoteId(id: string): Promise<boolean> {
    const result = await this.prisma.quote.findFirst({
      where: {
        id,
      },
    });

    return Boolean(result);
  }

  async getPreConfiguratedQuotes(
    dto: RequestPreConfiguratedQuotesType,
  ): Promise<any> {
    // TODO
    console.log('PolicyQuoteService.getPreConfiguratedQuotes');
    console.log('dto', dto);
    return preconfigurated_Mock;
  }

  async createQuote({
    dto,
    partnerId,
  }: {
    dto: CreateQuoteDto;
    partnerId: string;
  }): Promise<quote> {
    const quote = await this.prisma.quote.create({
      data: {
        partnerId,
        productId: dto.productId,
      },
    });

    return quote;
  }

  async calculateQuoteByMonth(dto: any): Promise<any> {
    // TODO
    console.log('PolicyQuoteService.calculateQuoteByMonth');
    console.log('dto', dto);
    return calculateQuote_Mock;
  }

  async calculateQuoteRange(dto: any): Promise<any> {
    // TODO
    console.log('PolicyQuoteService.calculateQuoteRange');
    return dto;
  }
}
