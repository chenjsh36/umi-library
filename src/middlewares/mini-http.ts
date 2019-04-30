/**
 * 小程序 http 请求中间件
 * @param {object} ctx 请求对象
 * @param {function} next 请求完成执行的回调
 */
import miniHttpFetcher from "../fetcher/mini-http.js";
import { IResponse, INext, IContext } from '../types/response';


export default async function miniHttpMiddleware(ctx: IContext, next: INext) {
  if (ctx.req.type !== "mini-http") {
    return await next();
  }
  if (typeof my === 'undefined') {
    console.error(
      "当前环境不支持调用小程序 http 能力，请在小程序环境下调用或确保小程序已经挂载 http 功能"
    );
    return await next();
  }
  const { originUrl } = ctx.req;

  let resOptions = {
    status: 408,
    statusText: "Request Timeout",
    ok: false,
    headers: typeof Headers === "function" ? new Headers() : {},
    body: `Request to ${originUrl} time out.`
  };

  const response: IResponse = await miniHttpFetcher(ctx.req);

  if (response && response.ok) {
    resOptions = {
      ok: true,
      status: 200,
      statusText: "OK",
      headers: typeof Headers === "function" ? new Headers() : {},
      body: response.body
    };
  }

  ctx.generateResponse(resOptions);

  await next();
}
