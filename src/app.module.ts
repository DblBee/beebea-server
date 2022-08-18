import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { WebModule } from './web/web.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BeeBeaModule } from './beebea/beebea.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpOptions } from './logger/pino-http.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        TYPEORM_LOGGING: Joi.boolean().default(false),
        PINO_LOG_LEVEL: Joi.required(),
      }),
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => {
        return {
          pinoHttp: {
            ...pinoHttpOptions,
            level: configSerivce.get<string>('LOG_LEVEL', 'trace'),
          },
        };
      },
    }),
    DatabaseModule,
    WebModule,
    BeeBeaModule,
  ],
})
export class AppModule {}
