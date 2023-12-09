import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {

    constructor(private prisma: PrismaService) {}

    async getById(id: string) : Promise<any> {
        const provider = await this.prisma.provider.findFirst({
            where: {id},
            include: {
                address: true,
                contact: true,
                partner: true
            }
        });
        return provider;
    }

    async create(input: any) : Promise<string> {
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
        const provider = await this.prisma.provider.create({
            data: {
                documentNumber: input.cnpj,
                addressId: address.id!,
                contactId: contact.id!,
                friendyName: input.name,
                name: input.name
            }
        });
        return provider.id;
    }
}
