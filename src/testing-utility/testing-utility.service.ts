import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock-repository';

@Injectable()
export class TestingUtilityService {
  static createMockRepository<T = any, K = any>(returnMock?: K): MockRepository<T> {
    return {
      find: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(returnMock),
        andWhere: jest.fn().mockReturnThis(),
      })),
    };
  }

  static createMockDataSource<T = any>(returnMock: T) {
    const mockQueryRunner = {
      connect: jest.fn(),
      release: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      manager: {
        save: jest.fn(async () => returnMock),
        findOne: jest.fn(),
      },
    };

    const mockDataSource = {
      createQueryRunner: () => mockQueryRunner,
    };

    return mockDataSource;
  }
}
