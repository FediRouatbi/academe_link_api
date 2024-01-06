import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
import { CommonModule } from './common/common.module';

import { AppConfigService } from './common/services/app-config.service';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

import { GqlException } from './common/utils/gql-exception.util';

async function bootstrap() {
  // Getting app context
  const ctx = await NestFactory.createApplicationContext(AppModule);

  // App config service
  const appConfigService = ctx.select(CommonModule).get(AppConfigService);

  // Initialize fastify app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: appConfigService.pinoLoggerConfig,
      disableRequestLogging:
        appConfigService.appConfig.environment === 'production',
    }),
  );

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const error = Array.isArray(errors) ? errors[0] : errors;
        const constraints = error.constraints || error.children[0].constraints;
        const [property, message] = [
          error.property,
          constraints[Object.keys(constraints)[0]],
        ];
        return new GqlException('400.714243', message);
      },
    }),
  );

  // Exception handling
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Enable cors
  app.enableCors();

  // Logger
  const logger = new Logger('NestApplication');

  await app.listen(appConfigService.appConfig.port, '0.0.0.0');

  logger.log(`==========================================================`);

  logger.log(`Server running on port ${appConfigService.appConfig.port}`);

  logger.log(`Environment is ${appConfigService.appConfig.environment}`);

  logger.log(`==========================================================`);
}
bootstrap();
