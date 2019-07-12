/**
 * Interface 
 */

// url-params
type UrlParams = {
  host: string;
  pathPrefix?: string;
  model?: string;
  path: string;
  pathPostfix?: string;
};

// base-url-Prams
type BaseUrlParams = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: object;
  timeout?: number;
};

// 范型
type Identity = <T>(params: T) => T;

// fly-query-params
type QueryParams = UrlParams & BaseUrlParams & { bodyPayload?: object };

// request-api
interface RequestFn {
  query(queryParams: QueryParams): Promise<any>;
  createQueryUrl(urlParams): string;
}

// output
export {
  Identity,
  QueryParams,
  RequestFn
}