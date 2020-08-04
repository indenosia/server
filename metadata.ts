import { Router } from './router.ts';
import { ControllerMetadata } from './metadata/controller.ts';

export class MetaData {
  static controllers: {[key: string]: any} = {};
  static methods: any[] = [];

  static objects() {
    return {
      controllers: this.controllers,
    };
  }

  static addController(name: string, routeurl: string, target: any) {
    const meta: any = {};
    meta.url = routeurl;
    meta.router = new Router();
    meta.methods = []
    this.methods.filter(method => method.controller === name).forEach(method => {
      meta.methods.push(method);
    });

    if (!this.controllers[name]) this.controllers[name] = new target();
    this.controllers[name].meta = meta;

    this.buildRoute(name, this.controllers[name].meta);
  }

  static buildRoute(name: string, meta: any) {
    let { url, router, methods } = meta;
    methods.forEach((method: any) => {
      switch (method.method) {
        case 'GET':
          router.get(`${method.url}` || '', method.target.bind(this.controllers[name]) || new Function());
          break;
        default:
          break;
      }
    });
  }

  static addMethod(method: string, controller: string, url: string, target: Function) {
    this.methods.push({
      controller,
      method,
      url,
      target,
    });
  }

}
