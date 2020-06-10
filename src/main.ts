import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import 'dotenv/config';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  // nest & fastify init
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // security
  app.use(helmet());

  // hot reload for dev
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // run server
  await app.listen(8080, '0.0.0.0');
  console.log(`Running server on: ${await app.getUrl()}`);
}

bootstrap();