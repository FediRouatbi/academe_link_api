import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from './resolvers/auth.resolver';

import { AuthService } from './services/auth.service';
import { AppConfigService } from '@src/common/services/app-config.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          global: true,
          secret: appConfigService.authConfig.jwt.secret,
          signOptions: { expiresIn: appConfigService.authConfig.jwt.expiresIn },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
