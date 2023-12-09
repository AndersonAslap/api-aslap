import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment';
import { roundPrice } from '../utils/calculate';

import { isEmpty } from 'lodash';

interface IReplaceCoverageDescription {
  longDescription: string;
  maxValue: number;
  minValue: number;
  gracePeriod: number;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private replaceCoverageDescription({
    gracePeriod,
    longDescription,
    maxValue,
    minValue,
  }: IReplaceCoverageDescription): string {
    const result = longDescription
      ?.replaceAll(`\\n`, '\n')
      .replaceAll('${gracePeriod}', gracePeriod?.toString())
      .replaceAll(
        '${maxValue}',
        maxValue?.toLocaleString('pt-BR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      )
      .replaceAll(
        '${minValue}',
        minValue?.toLocaleString('pt-BR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );

    return result;
  }

  private insuredCoveragesAdapter(insuredCoverages: any) {
    if (isEmpty(insuredCoverages)) return [];
    const result = insuredCoverages.map((item: any) => {
      const longDescription = this.replaceCoverageDescription({
        gracePeriod: item.gracePeriod,
        longDescription: item.coverage.longDescription,
        maxValue: item.maxValue,
        minValue: item.minValue,
      });

      return {
        insuredCoverageId: item.id,
        description: item.coverage.friendyName,
        information: item.coverage.information,
        longDescription,
        code: item.coverage.code,
        gracePeriod: item.gracePeriod,
        minValue: item.minValue,
        maxValue: item.maxValue,
      };
    });
    return result;
  }

  private productsAdapter(products: any) {
    const result = products.map((product: any) => this.productAdapter(product));
    return result;
  }

  public productAdapter(product: any) {
    const insuredCoverages = this.insuredCoveragesAdapter(
      product.insuredCoverages,
    );

    const price = Number(
      ((product.providerPrice + product.IOF) * product.markUp).toFixed(2),
    );

    product.insuranceDeductible;
    
    return {
      productId: product.id,
      product: {
        name: product.productType.friendyName,
        code: product.productType.code,
        susepCode: product.productType.susepCode,
      },
      description: product.description,
      maxAge: product.maxAge,
      durationDays: product.durationDays,
      initialValidDate: moment().add(1, 'days').startOf('day'),
      finaleValidDate: moment()
        .add(product.durationDays, 'days')
        .startOf('day'),
      price: roundPrice(price),
      iof: product.IOF,
      comission: product.commission,
      insuranceDeductible: product.insuranceDeductible,
      insuredCoverages: insuredCoverages,
    };
  }

  public async validateProductId(id: string): Promise<boolean> {
    const result = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    return Boolean(result);
  }

  async getCommon(): Promise<any> {
    const products = await this.prisma.product.findMany({
      include: {
        productType: true,
        insuredCoverages: {
          include: {
            coverage: true,
          },
        },
      },
    });

    const result = this.productsAdapter(products);
    return result;
  }

  async getCommonCoverage(productId: string): Promise<any> {
    const insuredCoverages = await this.prisma.insured_coverages.findMany({
      where: {
        productId,
      },
      include: {
        coverage: true,
      },
    });

    return {
      productId,
      insuredCoverages: this.insuredCoveragesAdapter(insuredCoverages),
    };
  }

  async getPartnerList(partnerId: string): Promise<any> {
    const products = await this.prisma.product.findMany({
      where: {
        partners: {
          some: {
            partnerId,
          },
        },
      },
      include: {
        productType: true,
        insuredCoverages: {
          include: {
            coverage: true,
          },
        },
      },
    });

    const result = this.productsAdapter(products);
    return { partnerId, products: result };
  }
}
