import { Module } from '@nestjs/common';
import { BeeBeaRouterModule } from './beebea-router/beebea-router.module';

@Module({
  imports: [BeeBeaRouterModule],
})
export class WebModule {}
