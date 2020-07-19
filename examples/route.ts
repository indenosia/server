import { Server, Router, Request, Response } from '../mod.ts';

const app: Server = new Server();

// user routing
const userRouter: Router = new Router();
userRouter.get('', (req: Request, res: Response) => {
  res.send('users');
});
userRouter.get('/:id', (req: Request, res: Response) => {
  res.send('users by id');
});
app.use('/users', userRouter);

// index routing
const indexRouter: Router = new Router();
indexRouter.get('', (req: Request, res: Response) => {
  res.send('halo, selamat datang di Indenosia!');
});
app.use('/', indexRouter);

app.listen({
  port: 8080,
}, () => {
  console.log('app running bos');
});
