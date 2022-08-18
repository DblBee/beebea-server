import { Module } from '@nestjs/common';
import { BeebeaRouterModule } from './beebea-router/beebea-router.module';

@Module({
  imports: [BeebeaRouterModule]
})
export class WebModule {}
