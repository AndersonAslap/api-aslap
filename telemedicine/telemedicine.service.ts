import { Injectable } from '@nestjs/common';

import * as telemedicineParticipant_Mock from './mocks/telemedicine-participant.json';
import * as telemedicineList_Mock from './mocks/telemedicine-list.json';
import * as telemedicineSpeciality_Mock from './mocks/telemedicine-speciality.json';
import * as telemedicineReason_Mock from './mocks/telemedicine-reason.json';
import * as telemedicineScheduling_Mock from './mocks/telemedicine-scheduling.json';

@Injectable()
export class TelemedicineService {
  async getSpecialities(): Promise<any> {
    // TODO
    console.log('TelemedicineService.getSpeciality');
    return telemedicineSpeciality_Mock;
  }

  async getReasons(): Promise<any> {
    // TODO
    console.log('TelemedicineService.getReasons');
    return telemedicineReason_Mock;
  }

  async getParticipant(participantId: number): Promise<any> {
    // TODO
    console.log('TelemedicineService.getParticipant');
    const result = telemedicineParticipant_Mock;
    result.id = participantId;

    return result;
  }

  async listParticipants({
    policy,
    proposal,
  }: {
    policy: string;
    proposal: string;
  }): Promise<any> {
    // TODO
    console.log('TelemedicineService.listParticipants');

    return telemedicineList_Mock;
  }

  async schedule(dto: any): Promise<any> {
    // TODO
    console.log('TelemedicineService.schedule');
    return telemedicineScheduling_Mock;
  }
}
