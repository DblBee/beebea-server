import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TestAppDataSource } from './e2e-datasource';
import { MigrationDataSource } from './migration-datasource';
import { SeedDataSource } from './seed-datasource';
import TypeOrmConfig from './typeorm.config';

describe('Database Config', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  describe('TypeOrmConfig', () => {
    it('should be defined', () => {
      const config = TypeOrmConfig.getOrmConfig(configService);
      expect(config).toBeDefined();
    });
  });

  describe('e2e-datasource', () => {
    it('should be defined', () => {
      const dataSource = TestAppDataSource;
      expect(dataSource).toBeDefined();
    });
  });

  describe('migration-datasource', () => {
    it('should be defined', () => {
      const dataSource = MigrationDataSource;
      expect(dataSource).toBeDefined();
    });
  });

  describe('seed-datasource', () => {
    it('should be defined', () => {
      const dataSource = SeedDataSource;
      expect(dataSource).toBeDefined();
    });
  });
});
