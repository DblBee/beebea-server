import { Module } from '@nestjs/common';
import { BeeBeaModule } from 'src/beebea/beebea.module';
import { BeebeaRouterController } from './beebea-router.controller';

@Module({
  imports: [BeeBeaModule],
  providers: [],
  controllers: [BeebeaRouterController],
})
export class BeebeaRouterModule {}
