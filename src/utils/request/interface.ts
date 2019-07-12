/**
 * 规定request的格式
 */

type UrlParams = {
  host?: string;
  pathPrefix?: string;
  model?: string;
  path?: string;
  pathPostfix?: string;
};

type FlyConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: object;
  timeout?: number;
};

type identity = <T>(params: T) => T;

type QueryParams = UrlParams & FlyConfig & { bodyPayload?: object };

interface QueryApi {
  query(queryParams: QueryParams): Promise<any>;
  createQueryUrl(urlParams): string;
  // getFlyConfig(queryParams): FlyConfig;
}



//  request
interface Request {
  ENGINE: any;// 引擎，一般是class，不是实例本身
  init():void;// 初始化fn
}

// request-contstuctor 
interface RequestConstructor {
  new(host:string):Request
}

// 生成 Request
export function createRequest( ctor: RequestConstructor, host:string ) :Request{
  return new ctor(host);
}

// output
export default createRequest;