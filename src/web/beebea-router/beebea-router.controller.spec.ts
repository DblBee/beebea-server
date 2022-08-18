import { Test, TestingModule } from '@nestjs/testing';
import { BeebeaRouterController } from './beebea-router.controller';

describe('BeebeaRouterController', () => {
  let controller: BeebeaRouterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeebeaRouterController],
    }).compile();

    controller = module.get<BeebeaRouterController>(BeebeaRouterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
