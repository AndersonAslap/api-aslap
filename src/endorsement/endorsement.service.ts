import { Injectable } from '@nestjs/common';

@Injectable()
export class EndorsementService {
  async cancel(dto: any): Promise<any> {
    // TODO
    console.log('EndorsementService.cancel');
    return dto;
  }

  async cancellationRequest(dto: any): Promise<any> {
    // TODO
    console.log('EndorsementService.cancellationRequest');
    return dto;
  }
}
