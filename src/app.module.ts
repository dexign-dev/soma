import { Global, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { ConfigModule, } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaExceptionFilter } from './util/prisma-exception.filter';
import { TransformResponseInterceptor } from './util/transform-response.interceptor';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { PostModule } from './post/post.module';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
        prismaOptions: {
          log: ['info', 'warn', 'query'],
        },
        explicitConnect: false,
      },
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: 'PRISMA',
      useValue: new PrismaClient(),
    },
    AppService,
  ],
  exports: ['PRISMA']
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject('PRISMA')
    private readonly prisma: PrismaClient
  ) { }

  async onModuleInit() {
  }
}
