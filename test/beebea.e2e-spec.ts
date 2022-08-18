import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { testDataSourceOptions } from 'src/database/e2e-datasource';
import { BeeBeaModule } from 'src/beebea/beebea.module';
import { BeeBeaService } from 'src/beebea/beebea.service';
import { TestingUtilityModule } from 'src/testing-utility/testing-utility.module';
import { GeneticElementType } from 'src/beebea/genetics/entities/genetic-trait.entity';
import { LoggerModule } from 'nestjs-pino';

describe('BeeBeaService (e2e)', () => {
  let app: INestApplication;
  let service: BeeBeaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testDataSourceOptions),
        LoggerModule.forRoot(),
        ConfigModule,
        BeeBeaModule,
        TestingUtilityModule,
      ],
      providers: [],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<BeeBeaService>(BeeBeaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createGenZeroBeeBea', () => {
    describe('generates a BeeBea object', () => {
      it('correctly generates all the objects properties including genes and status', async () => {
        try {
          const newBeeBea = await service.createGenZeroBeeBea('BeeBea', GeneticElementType.WATER);

          expect(newBeeBea).toBeDefined();
          expect(newBeeBea.id).toBeDefined();
        } catch (error) {
          console.log(error);
        }
      });
      it.todo('Test for duplicate errors');
    });
  });
});
