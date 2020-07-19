import { Server } from '../mod.ts';
import { Controller, GET } from '../decorator.ts';

// THIS IS CAN NOT RUN YET

const app: Server = new Server();

@Controller('/')
class IndexController {
  @GET()
  index() {
  }

  @GET('/:id')
  show() {
  }
}

app.modules({
  controllers: [
    IndexController
  ],
  inject: [],
});

app.listen({
  port: 8080,
}, () => {
  console.log('app running bos');
});
