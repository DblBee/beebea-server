import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpOptions } from './pino-http.config';
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => {
        return {
          pinoHttp: {
            ...pinoHttpOptions,
            level: configSerivce.get<string>('LOG_LEVEL')
              ? configSerivce.get<string>('LOG_LEVEL')
              : 'info',
          },
        };
      },
    }),
  ],
})
export class AppLoggerModule {}
