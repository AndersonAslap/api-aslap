import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}

  public async validatePartnerId(id: string): Promise<boolean> {
    const result = await this.prisma.partner.findFirst({
      where: {
        id,
      },
    });
    return Boolean(result);
  }

  async getById(id: string) : Promise<any> {
    const partner = await this.prisma.partner.findFirst({
        where: {id},
        include: {
            address: true,
            contact: true
        }
    });
    return partner;
  }

  async create(input: any) : Promise<any> {
    const address = await this.prisma.address.create({
        data: {
            cep: input.address.cep,
            city: input.address.city,
            neighborhood: input.address.neighborhood,
            number: input.address.number,
            state: input.address.state,
            complement: input.address.complement,
            street: input.address.street
        }
    })
    const contact = await this.prisma.contact.create({
        data: {
            email: input.contact.email,
            phoneNumber: input.contact.phoneNumber
        }
    })
    const partner = await this.prisma.partner.create({
        data: {
            documentNumber: input.cnpj,
            addressId: address.id,
            contactId: contact.id,
            friendyName: input.name,
            providerId: input.providerId,
            name: input.name
        }
    });
    return partner.id;
  }
}
