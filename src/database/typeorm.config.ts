import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from './strategies/snake-naming.strategy';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST', '127.0.0.1'),
      port: configService.get<number>('DATABASE_PORT', 5432),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      logging: configService.get<boolean>('TYPEORM_LOGGING', false),
      ssl: configService.get<string>('NODE_ENV') === 'production',
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      migrationsRun: false,
      synchronize: false,
    };
  }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
