import { Module } from '@nestjs/common';
import { BeeBeaModule } from 'src/beebea/beebea.module';
import { BeeBeaRouterController } from './beebea-router.controller';

@Module({
  imports: [BeeBeaModule],
  providers: [],
  controllers: [BeeBeaRouterController],
})
export class BeeBeaRouterModule {}
