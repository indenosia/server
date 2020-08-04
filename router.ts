import { AppModules } from './application.ts';
import { MetaData } from './metadata.ts';

import { Response } from './response.ts';
import { Request } from './request.ts';

export interface RouteAndHandler {
  url: string
  regex: string
  params?: any[]
  handlers: Function[]
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

  use(middleware: Function): void;
  use(url: string, router: Router): void;

  use(url: any, middleware?: any) {
    if (!middleware) {
      middleware = url;
      url = null;
    }

    if (typeof url === 'string' && middleware instanceof Router) {
      Object.keys(middleware.routes).forEach((method: string) => {
        middleware.routes[method].forEach((route: any) => {
          if (route.url === '\\/') route.url = '';
          url = `${url}${route.url}`;
          const regex = this.createRouteRegex(url);
          route.url = url;
          route.regex = regex.regex;
          route.params = regex.params;
          this.routes[method].push(route);
        });
      });
    } else {
      this.middlewares.push(middleware);
    }
  }

  protected createURL(req: Request): URL {
    let proto: string = `${req.proto.toLocaleLowerCase().split('/')[0]}://`;
    const addr: any = req.conn.localAddr;
    return new URL(`${proto}${addr.hostname}:${addr.port}${req.url}`);
  }

  protected createRouteRegex(url: string) {
    const params = url.match(/:([a-z]+)/gi);
    const regex = url.replace(/:[a-z]+/gi, '([0-9a-z]+)').replace('/', '\\/');
    return {
      regex,
      params
    };
  }

  register(modules: AppModules) {
    const { controllers } = modules;
    const meta = MetaData.objects().controllers;
    controllers.forEach((controller) => {
      const { url, router } = meta[controller.name].meta;
      this.use(url, router || new Router());
    });
    return this;
  }

  protected registerRoute(method: string, url: string, handlers: Function[]) {
    const { regex, params } = this.createRouteRegex(url);
    this.routes[method].push({
      url,
      regex: regex!,
      params: params!,
      handlers,
    });
  }

  get(url: string, ...handlers: Function[]) {
    this.registerRoute('GET', url, handlers);
  }

  post(url: string, ...handlers: Function[]) {
    this.registerRoute('POST', url, handlers);
  }

  put(url: string, ...handlers: Function[]) {
    this.registerRoute('PUT', url, handlers);
  }

  delete(url: string, ...handlers: Function[]) {
    this.registerRoute('DELETE', url, handlers);
  }

  protected match(req: Request): RouteAndHandler[] {
    const { pathname } = this.createURL(req);
    req.params = {};
    let routes: RouteAndHandler[] = this.routes[req.method];
    routes = routes.filter(route => {
      const re = new RegExp(`^${route.regex}\\/?$`, 'ig');
      const test = re.test(pathname);
      return test;
    });

    if (routes.length >= 1) {
      for (let route of routes) {
        let [, ...paramValues] = new RegExp(route.regex, 'ig').exec(pathname!)!;
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
