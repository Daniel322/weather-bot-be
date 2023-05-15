import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const globalPrefix = 'api';
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.enableCors({
    origin: new RegExp(process.env.COOKIE_DOMAIN),
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.use(compression());

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
