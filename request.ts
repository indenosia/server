import { ServerRequest } from './dependencies.ts';

export class Request extends ServerRequest{
  data?: any;
  params?: any;
}
