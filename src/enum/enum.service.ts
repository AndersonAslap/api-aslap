import { Injectable } from '@nestjs/common';

import * as getCards_Mocks from './mocks/get-cards-flag.json';

@Injectable()
export class EnumService {
  async getCardFlags(): Promise<any> {
    // TODO
    console.log('EnumService.getCardFlags');
    return getCards_Mocks;
  }
}
