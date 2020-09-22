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
  @Middleware(Middeware.Check)
  show() {
  }
}

class Middleware {
    check(next) {
        if 1 == 1 {
            return next()
        }
    }
}

const modules: AppModules = {
  controllers: [
    IndexController,
    AboutController,
  ],
};

app
  .register(modules)
  .listen({ port: 8080 }, () => {
    console.log('app running bos');
  });
