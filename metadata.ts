import { Router } from './router.ts';
import { ControllerMetadata } from './metadata/controller.ts';

export class MetaData {
  static controllers: {[key: string]: ControllerMetadata} = {};
  static objects() {
    return {
      controllers: this.controllers,
    };
  }

  static addController(name: string, routeurl: string, target: Function) {
    if (!this.controllers[name]) {
      this.controllers[name] = {};
    }
    this.controllers[name].url = routeurl;
    this.controllers[name].target = target;
    this.controllers[name].router = new Router();

    if (!this.controllers[name].methods) {
      this.controllers[name].methods = [];
    }

    let { url, router, methods } = this.controllers[name];
    methods?.forEach((method) => {
      switch (method.method) {
        case 'GET':
          router?.get(`${method.url}` || '', method.target || new Function());
          break;
        default:
          break;
      }
    });
  }

  static addMethod(method: string, controller: string, url: string, target: Function) {
    if (!this.controllers[controller]) {
      this.controllers[controller] = {};
    }
    if (!this.controllers[controller].methods) {
      this.controllers[controller].methods = [];
    }

    this.controllers[controller].methods?.push({
      method,
      url,
      target,
    });
  }
}
