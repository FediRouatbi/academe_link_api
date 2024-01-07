import AltairFastify, {
  AltairFastifyPluginOptions,
} from 'altair-fastify-plugin';
import { FastifyReply, FastifyRequest } from 'fastify';
import MercuriusLogging from 'mercurius-logging';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusDriver,
  MercuriusDriverConfig,
  MercuriusPlugin,
} from '@nestjs/mercurius';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { GqlThrottlerGuard } from './modules/auth/guards/gql-throttler.guard';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { GqlSharedModule } from './shared/gql-shared.module';

import { AppConfigService } from '@src/common/services/app-config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => [
        {
          ttl: appConfigService.rateLimitConfig.ttl,
          limit: appConfigService.rateLimitConfig.limit,
        },
      ],
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      fieldResolverEnhancers: ['guards'],
      driver: MercuriusDriver,
      graphiql: false,

      ide: false,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: (request: FastifyRequest, reply: FastifyReply) => ({
        request,
        reply,
      }),
      plugins: [
        {
          plugin: AltairFastify,
          options: {
            path: '/altair',
            baseURL: '/altair/',
            endpointURL: '/graphql',
          } as AltairFastifyPluginOptions,
        },
        {
          plugin: MercuriusLogging,
          options: {
            // logLevel: 'debug',
            // prependAlias: true,
            // logBody: true,
            logVariables: true,
            // logRequest: true,
            // logMessage: function (context: MercuriusContext) {
            //   return;
            // },
          },
        },
      ] as MercuriusPlugin<any>[],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    GqlSharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class GraphqlModule {}
