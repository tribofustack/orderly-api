export interface IHttpRequest {
  body?: any;
  params?: unknown;
  headers?: unknown;
  query?: unknown;
}

export interface IHttpResponse {
  status: number;
  body: unknown;
}

export interface IHttp {
  post(request: IHttpRequest): Promise<IHttpResponse>;
  get(request: IHttpRequest): Promise<IHttpResponse>;
  put(request: IHttpRequest): Promise<IHttpResponse>;
  patch(request: IHttpRequest): Promise<IHttpResponse>;
  delete(request: IHttpRequest): Promise<IHttpResponse>;
}
