import { Response } from './response.ts';
import { Request } from './request.ts';

export interface RouteAndHandler {
  url: string,
  params?: any[],
  handlers: Function[],
}

export interface Routes {
  [key: string]: RouteAndHandler[]
}

export class Router {
  protected middlewares: Function[];
  protected routes: Routes;
  constructor() {
    this.middlewares = [];
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      DELETE: [],
      OPTIONS: [],
    };
  }

  use(middleware: Function) {
    this.middlewares.push(middleware);
  }

  createURL(req: Request): URL {
    let proto: string = `${req.proto.toLocaleLowerCase().split('/')[0]}://`;
    const addr: any = req.conn.localAddr;
    return new URL(`${proto}${addr.hostname}:${addr.port}${req.url}`);
  }

  createRouteRegex(url: string) {
    const params = url.match(/:([a-z]+)/gi);
    const regex = url.replace(/:[a-z]+/gi, '([0-9a-z]+)').replace('/', '\\/');
    return {
      regex,
      params
    };
  }

  register(method: string, url: string, handlers: Function[]) {
    const { regex, params } = this.createRouteRegex(url);
    this.routes[method].push({
      url: regex,
      params: params!,
      handlers,
    });
  }

  get(url: string, ...handlers: Function[]) {
    this.register('GET', url, handlers);
  }

  post(url: string, ...handlers: Function[]) {
    this.register('POST', url, handlers);
  }

  put(url: string, ...handlers: Function[]) {
    this.register('PUT', url, handlers);
  }

  delete(url: string, ...handlers: Function[]) {
    this.register('DELETE', url, handlers);
  }

  protected match(req: Request): RouteAndHandler[] {
    const { pathname } = this.createURL(req);
    req.params = {};
    let routes: RouteAndHandler[] = this.routes[req.method];
    routes = routes.filter(route => {
      const re = new RegExp(`^${route.url}\\/?$`, 'ig');
      const test = re.test(pathname);
      return test;
    });

    if (routes.length >= 1) {
      for (let route of routes) {
        let [, ...paramValues] = new RegExp(route.url, 'ig').exec(pathname!)!;
        route.params?.forEach((param: any, index: any) => {
          param = param.replace(':', '');
          req.params[param] = paramValues[index];
        });
      }
    }

    return routes;
  }

  protected async handle(req: Request): Promise<Response> {
    let routes: RouteAndHandler[] = this.match(req);
    let res: Response = new Response(req);
    if (routes.length >= 1) {
      for (let handler of this.middlewares) {
        await handler(req, res);
      }
      for (let route of routes) {
        for (let handler of route.handlers) {
          await handler(req, res);
        }
      }
    } else {
      res.status(404);
    }

    return res;
  }
}
