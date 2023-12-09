import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('salesforce')
export class SalesforceController {
  constructor(private readonly http: HttpService) {}

  @ApiExcludeEndpoint()
  @Get('token')
  token() {
    return this.http
      .post(`https://login.salesforce.com/services/oauth2/token`, null, {
        params: {
          grant_type: 'password',
          client_id: process.env.SF_CLIENT_ID,
          client_secret: process.env.SF_CLIENT_SECRET,
          username: process.env.SF_USERNAME,
          password: process.env.SF_PASSWORD,
        },
      })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          throw 'An error happened!';
        }),
      )
      .pipe(
        map((res) => {
          const date = new Date(1970, 0, 1);
          date.setSeconds(res.data.issued_at);
          return {
            token: res.data.access_token,
            validDate: date,
          };
        }),
      );
  }
}
