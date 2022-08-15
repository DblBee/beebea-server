import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { WebModule } from './web/web.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BeebeaModule } from './beebea/beebea.module';

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
    AppLoggerModule,
    DatabaseModule,
    WebModule,
    BeebeaModule,
  ],
})
export class AppModule {}
