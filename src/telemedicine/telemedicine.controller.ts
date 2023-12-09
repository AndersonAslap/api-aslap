import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TelemedicineService } from './telemedicine.service';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RequestTMScheduleDto } from '../app/dtos/requests/request-tm-schedule.dto';
import { ResponseTMScheduleDto } from '../app/dtos/responses/response-tm-schedule.dto';
import { Response422SimpleDto } from '../app/dtos/responses/http-default/response422simple.dto';
import { ResponseTMSpecialityDto } from '../app/dtos/responses/response-tm-speciality.dto';
import { ResponseTMReasonDto } from '../app/dtos/responses/response-tm-reason.dto';
import { ResponseParticipantDto } from '../app/dtos/responses/response-participant.dto';

@ApiTags('Telemedicina')
@ApiExcludeController()
@Controller('/telemedicine')
export class TelemedicineController {
  constructor(private readonly telemedicineService: TelemedicineService) {}

  @Get('speciality')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista Especialidades',
    description: 'Obtem uma lista de especialidades atendidas.',
  })
  @ApiOkResponse({ type: [ResponseTMSpecialityDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getSpecialities() {
    const result = await this.telemedicineService.getSpecialities();
    return result;
  }

  @Get('reason')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista Motivos',
    description:
      'Obtém uma lista de motivos comuns para agendamento de consulta. Pode tambem ser realizado filtro pelo ID do motivo e pela especialidade atentida.',
  })
  @ApiOkResponse({ type: [ResponseTMReasonDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getReasons() {
    const result = await this.telemedicineService.getReasons();
    return result;
  }

  @Get('participant')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca participante.',
    description: 'Busca participante pelo id.',
  })
  @ApiQuery({
    name: 'participantId',
    type: Number,
    description: 'Código do participante.',
    required: true,
  })
  @ApiOkResponse({ type: ResponseParticipantDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async getParticipant(@Query('participantId') participantId: number) {
    if (!participantId)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          participantId: 'participantId is mandatory  (query)',
        },
      });
    const result = await this.telemedicineService.getParticipant(participantId);
    return result;
  }

  @Get('participant/list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista participantes.',
    description:
      'Busca participantes referente a apólice. Necessário informar um parametro para busca.',
  })
  @ApiQuery({
    name: 'policy',
    type: String,
    description: 'Código da apólice.',
    required: false,
  })
  @ApiQuery({
    name: 'proposal',
    type: String,
    description: 'Código da proposta.',
    required: false,
  })
  @ApiOkResponse({ type: [ResponseParticipantDto], description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async listParticipants(
    @Query('policy') policy: string,
    @Query('proposal') proposal: string,
  ) {
    const result = await this.telemedicineService.listParticipants({
      policy,
      proposal,
    });
    return result;
  }

  @Post('schedule')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agenda consulta',
    description:
      'Realiza o agendamento da consulta, o cliente receberá um email e SMS com o link da consulta.',
  })
  @ApiOkResponse({ type: ResponseTMScheduleDto, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiUnprocessableEntityResponse({
    type: Response422SimpleDto,
    description: 'Entidade não processável',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async schedule(@Body() dto: RequestTMScheduleDto) {
    const result = await this.telemedicineService.schedule(dto);
    return result;
  }
}
