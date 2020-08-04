import { Router } from '../router.ts';

export interface MethodMetadata {
  method?: string;
  url?: string;
  target: Function;
}

export interface ControllerMetadata {
  url?: string;
  target?: Function;
  router?: Router;
  methods?: MethodMetadata[];
}
