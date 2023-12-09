import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('junto')
export class JuntoController {
  constructor(private readonly http: HttpService) {}

  @ApiExcludeEndpoint()
  @Get('token')
  token() {
    return this.http
      .post(`${process.env.JUNTO_BASEURL}/guarantee/api/v1/authentication`, {
        userName: process.env.JUNTO_USERNAME,
        password: process.env.JUNTO_PASSWORD,
      })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          throw 'An error happened!';
        }),
      )
      .pipe(
        map((res) => {
          return {
            token: res.data,
          };
        }),
      );
  }
}
