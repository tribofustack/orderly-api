import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import {
  IHttp,
  IHttpRequest,
  IHttpResponse,
} from '../../../../internal/application/ports/http/http';

const RESOURCE = 'checkin';

@Injectable()
export class CustomerHttp implements IHttp {
  constructor(private httpService: HttpService) {}

  async post(request: IHttpRequest): Promise<IHttpResponse> {
    const response = await lastValueFrom(
      this.httpService.post(RESOURCE, {
        date: new Date(),
        customer: request.body.customer,
      }),
    );
    return {
      body: response.data,
      status: response.status,
    };
  }
  get(request: IHttpRequest): Promise<IHttpResponse> {
    console.log('request', request);
    throw new Error('Method not implemented.');
  }
  put(request: IHttpRequest): Promise<IHttpResponse> {
    console.log('request', request);
    throw new Error('Method not implemented.');
  }
  patch(request: IHttpRequest): Promise<IHttpResponse> {
    console.log('request', request);
    throw new Error('Method not implemented.');
  }
  delete(request: IHttpRequest): Promise<IHttpResponse> {
    console.log('request', request);
    throw new Error('Method not implemented.');
  }
}
