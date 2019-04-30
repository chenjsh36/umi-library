/**
 * 小程序 RPC 请求中间件
 * @param {object} ctx 请求对象
 * @param {function} next 请求完成执行的回调
 */
import miniRpcFetcher from "../fetcher/mini-rpc.js";
import { IResponse, IContext, INext } from '../types/response';

declare global {
  let my: {
    httpRequest: Function;
    canIUse: Function;
    call: Function;
  }
}

export default async function miniRpcMiddleware(ctx: IContext, next: INext) {
  if (ctx.req.type !== "mini-rpc") {
    return await next();
  }
  if (typeof my === 'undefined' || my.canIUse("rpc") === false) {
    console.error(
      "当前环境不支持调用小程序 RPC 能力，请在小程序环境下调用或确保小程序已经挂载 RPC 功能"
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

  const response: IResponse = await miniRpcFetcher(ctx.req);

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
