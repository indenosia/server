import { Router } from '../router.ts';
import { ControllerMetadata } from './controller.ts';

export class MetaData {
  static controllers: {[key: string]: ControllerMetadata} = {};
  static objects() {
    return {
      controllers: this.controllers,
    };
  }

  static addController(name: string, url: string, target: Function) {
    if (!this.controllers[name]) {
      this.controllers[name] = {};
    }
    this.controllers[name].url = url;
    this.controllers[name].target = target;
    this.controllers[name].router = new Router();

    if (!this.controllers[name].methods) {
      this.controllers[name].methods = [];
    }
  }

  static addMethod(controller: string, url: string, target: Function) {
    if (!this.controllers[controller]) {
      this.controllers[controller] = {};
    }
    if (!this.controllers[controller].methods) {
      this.controllers[controller].methods = [];
    }

    this.controllers[controller].methods?.push({
      url,
      target,
    });
  }
}
