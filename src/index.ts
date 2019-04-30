import Core from "@alipay/puck-core";
import miniRpcMiddleware from "./middlewares/mini-rpc";
import miniHttpMiddleware from "./middlewares/mini-http";
import { IRequestOption, IResponse } from './types/response'

// 内置中间件
const middlewares: any[] = [miniRpcMiddleware, miniHttpMiddleware];

class Puck extends Core {
  public static version = '1.1.0';

  middlewares!: Function[]

  constructor(options?: any) {
    super(options);
    middlewares.forEach(m => {
      super.use(m);
    });
  }

  public dUse(fn: Function) {
    const superDefaultMiddleWaresLength = 3;
    this.middlewares.splice(this.middlewares.length - superDefaultMiddleWaresLength - middlewares.length, 0, fn);
    console.log('after use:', this.middlewares)
    return this;
  }

  public async dRequest(url: string, option: IRequestOption = {}): Promise<IResponse> {
    return super
      .request(url, option)
      .then((response: IResponse) => {
        return Promise.resolve(response.body);
      })
      .catch((err: IResponse) => {
        return Promise.resolve(err);
      });
  }
}

const puck = new Puck();
export default puck;
