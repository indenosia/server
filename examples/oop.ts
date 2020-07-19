import { Server, AppModules, Request, Response } from '../mod.ts';
import { Controller, GET } from '../decorator.ts';

const app: Server = new Server();

@Controller()
class IndexController {
  @GET()
  index(req: Request, res: Response) {
    res.send('halo');
  }
}

@Controller('/about')
class AboutController {
  @GET()
  index(req: Request, res: Response) {
    res.send('about');
  }

  @GET('/:id')
  show() {
  }
}

const modules: AppModules = {
  controllers: [
    IndexController,
    AboutController,
  ],
  inject: [],
};

app
  .register(modules)
  .listen({ port: 8080 }, () => {
    console.log('app running bos');
  });
