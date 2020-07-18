import { Server, Request, Response } from '../mod.ts';

const app: Server = new Server();

app.get('/', (req: Request, res: Response) => {
  res.send('halo, selamat datang di Indenosia!');
});

app.listen({
  port: 8080,
}, () => {
  console.log('app running bos');
});
