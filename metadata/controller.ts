import { Router } from '../router.ts';

export interface MethodMetadata {
  url?: string;
  target?: Function;
}

export interface ControllerMetadata {
  url?: string;
  target?: Function;
  router?: Router;
  methods?: MethodMetadata[];
}
