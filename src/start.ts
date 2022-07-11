import {NestFactory} from '@nestjs/core';
import type {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './AppModule';
import path from 'path';
import {WsAdapter} from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useStaticAssets(path.join(__dirname, '..', 'static'));
  await app.listen(3000);
}

bootstrap().catch(console.error);
