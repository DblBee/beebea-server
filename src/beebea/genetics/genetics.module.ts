import { Module } from '@nestjs/common';
import { GeneticsService } from './genetics.service';

@Module({
  providers: [GeneticsService],
  exports: [GeneticsService],
})
export class GeneticsModule {}
