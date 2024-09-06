import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
   const app = await NestFactory.create(AppModule);
  // const httpsOptions = {
  //   key: fs.readFileSync(process.env.PRIVATE_KEY),
  //   cert: fs.readFileSync(process.env.CERTIFICATE),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
