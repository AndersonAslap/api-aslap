import { Injectable } from '@nestjs/common';
import { PolicyProposalDto } from './dtos/policy-proposal.dto';

import * as proposalCombo_Mock from './mocks/proposal-combo.json';
import generateTicketId from '../../utils/generate-ticket-id';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerService } from '../../customer/customer.service';
import { proposal } from '@prisma/client';

@Injectable()
export class PolicyProposalService {
  constructor(
    private prisma: PrismaService,
    private customerService: CustomerService,
  ) {}

  public async findProposalByQuoteId(quoteId: string): Promise<any> {
    const proposal = await this.prisma.proposal.findFirst({
      where: {
        quoteId,
      },
    });

    return proposal;
  }

  async create({
    dto,
    partnerId,
  }: {
    dto: PolicyProposalDto;
    partnerId: string;
  }): Promise<proposal> {
    let customer = await this.customerService.findCustomerByDocumentNumber(
      dto.customer.documentNumber,
    );

    if (!customer) {
      customer = await this.customerService.create(dto.customer);
    }

    const proposal = await this.prisma.proposal.create({
      data: {
        partnerId,
        customerId: customer.id,
        quoteId: dto.quoteId,
      },
    });

    return proposal;
  }

  async createPreconfigured(dto: any): Promise<any> {
    // TODO
    console.log('PolicyProposalService.createPreconfigured');
    console.log('dto', dto);
    return generateTicketId();
  }

  async createCombo(dto: any): Promise<any> {
    // TODO
    console.log('PolicyProposalService.createCombo');
    const result = proposalCombo_Mock;
    result[0].product = dto.product;

    result[0].ticket = generateTicketId().ticket;

    return result;
  }
}
