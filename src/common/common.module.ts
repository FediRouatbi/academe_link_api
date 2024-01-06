import Joi from 'joi';
import { join } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './services/app-config.service';
import { BcryptService } from './services/bcrypt.service';
import { DateService } from './services/date.service';
import { MailService } from './services/mail.service';
import { PrismaService } from './services/prisma.service';
import { StringService } from './services/string.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        REFRESH_JWT_SECRET: Joi.string().required(),
        OTP_JWT_SECRET: Joi.string().required(),
        OTP_ACTION_JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1 day'),
        REFRESH_JWT_EXPIRES_IN: Joi.string().default('30 day'),
        OTP_JWT_EXPIRES_IN: Joi.string().default('2m'),
        OTP_ACTION_JWT_EXPIRES_IN: Joi.string().default('15m'),
        OTP_LENGTH: Joi.number().default(4),
        BCRYPT_ROUNDS: Joi.number().default(5),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        MAIL_SECURE: Joi.boolean().required(),
        MAIL_DOMAIN: Joi.string(),
        MAIL_DEFAULT_FROM: Joi.string(),
        THROTTLE_TTL: Joi.number().default(60000),
        THROTTLE_LIMIT: Joi.number().default(100),
      }),
    }),
    MailerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        transport: appConfigService.mailerConfig.transport,
        defaults: {
          from: appConfigService.mailerConfig.from,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [
    PrismaService,
    AppConfigService,
    BcryptService,
    MailService,
    StringService,
    DateService,
  ],
  exports: [
    PrismaService,
    AppConfigService,
    BcryptService,
    MailService,
    StringService,
    DateService,
  ],
})
export class CommonModule {}
