import { IResponse, IRequestInstance, IResponseInstance} from '../types/response'


interface IMyResponse {
  data: string;
  status: number;
  headers: object;
}

export default async function miniHttpFetcher(req: IRequestInstance):Promise<IResponse> {
  const { timeout } = req;
  const miniHttpPromise = httpReq(req);
  const response: IResponse = await Promise.race([miniHttpPromise, delay(timeout)]);
  return response;
}



function httpReq(req: IRequestInstance): Promise<IResponse> {
  const {
    url,
    headers = {},
    method = "GET",
    query = {},
    timeout = 30000,
    dataType = "json"
  } = req;
  return new Promise(resolve => {
    my.httpRequest({
      url,
      method,
      data: query,
      dataType,
      timeout,
      headers,
      success: function(res: IMyResponse) {
        return resolve({
          ok: true,
          body: res.data
        });
      },
      fail: function(res: IMyResponse) {
        return resolve({
          ok: true,
          body: res
        });
      },
      complete: function() {
        // do when complete
      }
    });
  });
}

function delay(time: number) : Promise<IResponse>{
  return new Promise(resolve => setTimeout(resolve, time));
}
