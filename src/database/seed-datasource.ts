import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

import { SnakeNamingStrategy } from './strategies/snake-naming.strategy';

export const seedDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/seeds/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true' || false,
  ssl: process.env.NODE_ENV === 'production',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const SeedDataSource: DataSource = new DataSource(seedDataSourceOptions);
