import { IResponse, IRequestInstance} from '../types/response'

export default async function miniRpcFetcher(req: IRequestInstance): Promise<IResponse> {
  const { url, data, timeout } = req;
  const miniRpcPromise = rpcReq(url, data);
  const response: IResponse = await Promise.race([miniRpcPromise, delay(timeout)]);
  return response;
}


function rpcReq(url: string, data: object): Promise<IResponse> {
  return new Promise(resolve => {
    my.call("rpc", {
      operationType: url,
      requestData: [data],
      success: (result: any) => {
        return resolve({
          ok: true,
          body: result
        });
      },
      fail: (error: any) => {
        return resolve({
          ok: true,
          body: error
        });
      }
    });
  });
}

function delay(time: number): Promise<IResponse> {
  return new Promise(resolve => setTimeout(() => {
    resolve({
      ok: false,
      body: {}
    })
  }, time));
}
