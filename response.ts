import { Response as DenoResponse } from './dependencies.ts';
import { Request } from './request.ts';
import { Header, HeaderManager } from './header.ts';

export class Response {
  protected req: Request;
  protected body?: string;
  protected _status?: number;
  protected headerManager: HeaderManager = new HeaderManager();
  constructor(req: Request) {
    this.req = req;
    this._status = 200;
  }

  addHeader(key: string, value: string) {
    this.headerManager.add(key, value);
    return this;
  }

  getHeaders() {
    return this.headerManager.parsedHeader;
  }

  status(_status: number) {
    this._status = _status;
    return this;
  }

  getStatus() {
    return this._status;
  }

  protected bodyStringify(body: any) {
    switch(typeof body) {
      case 'object':
        body = JSON.stringify(body);
        break;
      case 'number':
        body = `${body}`;
        break;
    }
    return body;
  }

  send(body: string) {
    body = this.bodyStringify(body);

    if(!this.headerManager.has('Content-Type')) {
      this.headerManager.add('Content-Type', 'text/html');
    }
    const res: DenoResponse = {
      body,
      headers: new Headers(this.headerManager.parsedHeader),
    };
    this.req.respond(res);
  }

  json(body: any | string) {
    this.headerManager.add('Content-Type', 'application/json');
    const res: DenoResponse = {
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: new Headers(this.headerManager.parsedHeader),
    };
    this.req.respond(res);
  }
}
