import { listenAndServe, Response as DenoResponse } from './dependencies.ts';
import { Router } from './router.ts';
import { Request } from './request.ts';
import { Response } from './response.ts';

export class Server extends Router {
  constructor() {
    super();
  }
  
  protected async handler(req: Request) {
    const res = await this.handle(req);
    console.log(req.method, res?.getStatus(), req.url);
  }

  listen(opts: Deno.ListenOptions, callback: () => void) {
    listenAndServe(opts, this.handler.bind(this));
    callback();
  }

}
