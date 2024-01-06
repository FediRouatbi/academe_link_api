import { PinoLoggerOptions } from 'fastify/types/logger';
import { PrettyOptions } from 'pino-pretty';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  private getString(key: string): string {
    return this.configService.get<string>(key);
  }

  private getNumber(key: string): number {
    return Number(this.getString(key));
  }

  private getBoolean(key: string): boolean {
    const res = this.configService.get<boolean>(key);
    if (typeof res === 'boolean') return res;
    switch (
      this.configService.get<boolean>(key)?.toString()?.toLowerCase()?.trim()
    ) {
      case 'true':
      case 'yes':
      case '1':
        return true;

      default:
        return false;
    }
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      environment: this.getString('NODE_ENV'),
    };
  }

  get authConfig() {
    return {
      hash: {
        rounds: this.getNumber('BCRYPT_ROUNDS'),
      },
      jwt: {
        secret: this.getString('JWT_SECRET'),
        expiresIn: this.getString('JWT_EXPIRES_IN'),
      },
      refreshJwt: {
        secret: this.getString('REFRESH_JWT_SECRET'),
        expiresIn: this.getString('REFRESH_JWT_EXPIRES_IN'),
      },
      otpJwt: {
        secret: this.getString('OTP_JWT_SECRET'),
        expiresIn: this.getString('OTP_JWT_EXPIRES_IN'),
        otpLength: this.getNumber('OTP_LENGTH'),
      },
      otpActionJwt: {
        secret: this.getString('OTP_ACTION_JWT_SECRET'),
        expiresIn: this.getString('OTP_ACTION_JWT_EXPIRES_IN'),
      },
    };
  }

  get mailerConfig() {
    return {
      from: this.getString('MAIL_DEFAULT_FROM'),
      transport: {
        host: this.getString('MAIL_HOST'),
        secure: this.getBoolean('MAIL_SECURE'),
        port: this.getNumber('MAIL_PORT'),
        auth: {
          user: this.getString('MAIL_USER'),
          pass: this.getString('MAIL_PASSWORD'),
        },
      },
      contactUsMail: this.getString('CONTACT_US_MAIL'),
    };
  }

  get rateLimitConfig() {
    return {
      ttl: this.getNumber('THROTTLE_TTL'),
      limit: this.getNumber('THROTTLE_LIMIT'),
    };
  }

  get pinoLoggerConfig(): PinoLoggerOptions {
    return {
      transport: {
        targets: [
          {
            level: 'debug',
            target: 'pino-pretty',
            options: {
              translateTime: 'SYS:mm/dd/yyyy hh:MM:ss TT',
              colorize: false,
              singleLine: true,
              levelFirst: false,
              ignore: 'pid,hostname,context,req,res.headers',
              errorLikeObjectKeys: ['err', 'error'],
              destination: './logs/debug.log',
              mkdir: true,
              sync: false,
              apend: false,
            } as PrettyOptions,
          },
          ...(this.appConfig.environment === 'development'
            ? [
                {
                  level: 'debug',
                  target: 'pino-pretty',
                  options: {
                    translateTime: 'SYS:mm/dd/yyyy hh:MM:ss TT',
                    colorize: true,
                    singleLine: true,
                    levelFirst: false,
                    ignore: 'pid,hostname,context,req,res.headers',
                    errorLikeObjectKeys: ['err', 'error'],
                  } as PrettyOptions,
                },
              ]
            : []),
        ],
      },
    };
  }
}
