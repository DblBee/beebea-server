import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { TestingUtilityModule } from './testing-utility/testing-utility.module';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { WebModule } from './web/web.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      isGlobal: true,
    }),
    TestingUtilityModule,
    AppLoggerModule,
    WebModule,
    DatabaseModule,
  ],
})
export class AppModule {}
