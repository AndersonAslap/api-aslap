import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, customer } from '@prisma/client';
import { CustomerDto } from './dtos/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  public async validateCustomerId(id: string): Promise<boolean> {
    const result = await this.prisma.customer.findFirst({
      where: {
        id,
      },
    });

    return Boolean(result);
  }

  public async findCustomerByDocumentNumber(
    documentNumber: string,
  ): Promise<Prisma.Prisma__customerClient<customer, never>> {
    const result = await this.prisma.customer.findFirst({
      where: {
        documentNumber,
      },
      include: {
        address: true,
        contact: true,
      },
    });

    return result;
  }

  public async create(dto: CustomerDto): Promise<any> {
    const result = await this.prisma.customer.create({
      data: {
        ...dto,
        contact: {
          create: {
            ...dto.contact,
          },
        },
        address: {
          create: {
            ...dto.address,
          },
        },
      },
      include: {
        address: true,
        contact: true,
      },
    });

    return result;
  }
}
