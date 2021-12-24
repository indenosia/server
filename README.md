<div>
  <img src="https://user-images.githubusercontent.com/16364286/87875875-7630b080-c9fe-11ea-84cb-724cbf80f4f7.png" alt="Indenosia" width="25%" />
</div>

# indenosia/server
Framework untuk membuat server HTTP dengan <a href="https://deno.land/" target="_blank">Deno</a>

# Cara Menggunakan
1. Buatlah file dengan ekstensi `.ts`, contoh `server.ts`.
2. Ketikkan atau copy-paster kode program berikut ke file tersebut.
```typescript
import { Server, Request, Response } from 'https://denoland.id/x/indenosia/mod.ts';

const app: Server = new Server();

app.get('/', (req: Request, res: Response) => {
  res.send('Inodesia, web framework nya orang Indonesia');
});

app.listen({
  port: 8080,
}, () => {
  console.log('app sedang berjalan');
})
```
3. Simpan file.
4. Jalankan melalui terminal (CLI) dengan menjalankan perintah berikut.
```bash
deno run --allow-all server.ts
```

<details>
  <summary>Contoh Lain</summary>
  Lihat contoh lainnya <a href="https://github.com/indenosia/server/tree/master/examples" target="_blank">di sini</a>!
</details>

# Kontribusi
Project framework ini adalah untuk menambah kontribusi developer dari Indonesia untuk dunia opensource,
dengan harapan dapat memicu kesadaran akan manfaat berkontribusi terhadap pengembangan software berbasis opensource.

### Tata Cara
1. Lakukan **fork** pada *repository* ini.
2. Perubahan dapat Anda lakukan pada repository hasil fork.
3. Mengirim perubahan dengan membuat sebuah **pull request**.

Selamat, Anda termasuk orang hebat yang turut berkontribusi!

# Todo
- [x] Server
- [x] Router
- [x] Nested Router
- [ ] Unit Testing
