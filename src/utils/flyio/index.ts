// 生成规定格式的request方法
import { createRequest } from '../request/interface'
// interface
import {  } from './interface';
const fly = require('flyio/dist/npm/fly');
// fly 实例
const FLY = new fly();

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

/**
 * fly实例查询api方法
 * @user:
 *    ```typescript
 *       const baseQuery = new Query('user');
 *       baseQuery.query({
 *        host: 'http://baidu.com',
 *        pathPrefix: "uapi/v1/",
 *        model: "",
 *        path: "",
 *        pathPostfix: "",
 *        method: "GET",
 *        timeout: 0, //超时时间，为0时则无超时限制
 *        bodyPayload:{}
 *       })
 *    ```
 */
export class Query implements QueryApi {
  // 常量
  public ENGINE = FLY;// axios类似的工具引擎
  public HOST = '';// api_host
  public DEFAULT_URL_CONFIG = {
    host: '',
    pathPrefix: "",
    model: "",
    path: "",
    pathPostfix: ""
  } as UrlParams;

  constructor(host: string) {
    // 初始化
    this.init(host);
  }

  /**
   * 初始化
   * @params: init( 'http:www.baidu.com' );
   *  */
  public init(host: string) {
    this.HOST = host;
    this.ENGINE = new fly();
    this.ENGINE.config.timeout = 5000;
  }

  /* 
   * request,发起请求
   * @params: 
   *        {
   *          pathPrefix: "uapi/v1/",
   *          model: "",
   *          path: "",
   *          pathPostfix: "",
   *          method: "GET",
   *          timeout: 0, //超时时间，为0时则无超时限制
   *          bodyPayload:{}
   *       }
   * @return: Promist
   */
  public async query(queryParams: QueryParams) {
    try {
      let url = this.createQueryUrl(queryParams);
      let config = this.createFlyConfig(queryParams);
      let bodyPayload = queryParams.bodyPayload ? queryParams.bodyPayload : {};
      return this.ENGINE.request(url, bodyPayload, config).then(res=>{
        return res;
      }).catch(error => {
        console.error(error);
        return error;
      });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  /** 
   * 设置engine的headerConfig
   * @params: { 'User-Token': res.data.token }
   */
  public setHeader(config: object): void {
    // 设置全局config
    this.ENGINE.config.headers = Object.assign({}, config);
  }

  /*
   * 设置engineRequest的拦截器
   * @params: <identity>hook
   * @return: void
   */
  public setRequestIntercepter(hook: (request: object) => any): void {
    this.ENGINE.interceptors.request.use(hook);
  }

  /*
   * 设置engineRequest的拦截器
   * @params: <identity>hook
   * @return: void
   */
  public setResponseIntercepter(hook: identity): void {
    // 设置全局config
    this.ENGINE.interceptors.response.use(hook);
  }

  /*
   * 锁定网络请求
   * @params: null
   * @return: void
   */
  public lock(): void {
    this.ENGINE.lock();
    // 一分钟后自动解锁
    setTimeout(() => {
      this.unLock(); 
    }, 60000);
  }

  /*
   * 解锁网络请求
   * @params: null
   * @return: void
   */
  public unLock(): void {
    this.ENGINE.unlock();
  }

  /**
   * 设置默认url配置
   * @param urlParams 
   */

  public setDefaultUrlConfig(urlPrams: UrlParams): void {
    this.DEFAULT_URL_CONFIG = Object.assign({}, this.DEFAULT_URL_CONFIG, urlPrams);
  }

  /** 
   * 生成请求的url
   * @params
   * {
   *    host?: string | undefined;
   *    pathPrefix?: string | undefined;
   *    model?: string | undefined;
   *    path?: string | undefined;
   *    pathPostfix?: string | undefined;
   * }
   */
  public createQueryUrl(urlParams: UrlParams): string {
    // 合并后的 url参数
    let finalUrlParams = Object.assign(
      {},
      this.DEFAULT_URL_CONFIG,
      urlParams
    ) as UrlParams;

    return `${finalUrlParams.host}/${finalUrlParams.pathPrefix}${ finalUrlParams.model }${finalUrlParams.path ? "/" + finalUrlParams.path : ""}${ finalUrlParams.pathPostfix }`;
  }

  /*
   * 生成flyjs的config
   */
  public createFlyConfig(qureyParams: FlyConfig): FlyConfig {
    // 默认的 fly 的 request_config
    const DEFAULT_FLY_CONFIG = {
      method: "GET",
      headers: {},
      parseJSON: true, // 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
      timeout: 0, //超时时间，为0时则无超时限制
      withCredentials: true //跨域时是否发送cookie
    } as FlyConfig;

    return Object.assign(DEFAULT_FLY_CONFIG, qureyParams);
  }

  /**
   * 获取当前ENGINE
   */
  getEngine() {
    return this.ENGINE;
  }
}

// Export
export default Query;
