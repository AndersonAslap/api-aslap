import {
  HttpStatus,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import generateTicketId from '../utils/generate-ticket-id';
import { CreatePolicyDto } from './dtos/create-policy.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RequestCancelPolicyDto } from './dtos/request-cancel-policy.dto';
import { PolicyStatusEnum } from '../app/enums/PolicyStatus.enum';
import { policy } from '@prisma/client';

@Injectable()
export class PolicyService {
  constructor(private prisma: PrismaService) {}
  async issue(dto: any): Promise<any> {
    // TODO
    console.log('PolicyService.issue');
    return generateTicketId();
  }

  async issuePreconfigured(dto: any): Promise<any> {
    // TODO
    console.log('PolicyService.issuePreconfigured');
    return generateTicketId();
  }

  async create(dto: CreatePolicyDto): Promise<policy> {
    const policy = await this.prisma.policy.create({
      data: dto,
    });
    return policy;
  }

  async cancelPolicy(dto: RequestCancelPolicyDto): Promise<Date> {
    const foundPolicy = await this.prisma.policy.findFirst({
      where: {
        id: dto.policyId,
      },
      include: {
        customer: true,
        product: true,
        provider: true,
      },
    });

    if (!foundPolicy) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          partnerId: 'Policy not found',
        },
      });
    }

    if (foundPolicy.status === PolicyStatusEnum.CANCELED) {
      throw new HttpException(
        'Policy is already canceled.',
        HttpStatus.CONFLICT,
      );
    }

    // TODO - enviar para o provider informando cancelamento se houver endpoint
    // TODO - interromper cobrança do stripe
    // TODO - obter data de corte do proximo pagamento do stripe
    // TODO - DUVIDA? salesForce? o que fazer

    const updatedPolicy = await this.prisma.policy.update({
      where: {
        id: dto.policyId,
      },
      data: {
        cancellationDate: new Date(),
        cancellationReason: dto.cancellationReason,
        status: PolicyStatusEnum.CANCELED,
      },
    });
    return updatedPolicy.cancellationDate;
  }
}
