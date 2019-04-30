
export interface IResponse {
  status?: number;
  statusText?: string;
  ok: boolean;
  headers?: object;
  body: any;
}

type MethodNames = 'GET' | 'POST' | 'PUT' | 'DELETE';
type TypeNames = 'normal' | 'jsonp' | 'mini-rpc' | 'mini-http';
type DataTypeNames = 'json' | 'text';
type CredentialsNames = 'include' | 'same-origin' | 'omit';

export interface IRequestOption {
  method?: MethodNames;
  headers?: any;
  data?: any | null;
  type?: TypeNames;
  dataType?: DataTypeNames;
  jsonp?: string;
  jsonpCallback?: string;
  timeout?: number;
  cors?: boolean;
  credentials?: CredentialsNames;
}

export interface IRequestInstance extends IRequestOption {
  method: MethodNames;
  headers: any;
  data: any | null;
  type: TypeNames;
  dataType: DataTypeNames;
  jsonp: string;
  jsonpCallback: string;
  timeout: number;
  cors: boolean;
  credentials?: CredentialsNames;

  url: string;
  originUrl: string;
  query: object;
}

export interface IResponseInstance extends IResponse {
  createResponseEntity(): IResponse
}

export interface IContext {
  req: IRequestInstance;
  res: IResponseInstance;
  generateRequest(url: string, options: IRequestOption): IContext;
  generateResponse(options: IResponse): IContext;
}

export interface INext {
  (): Promise<any>
}