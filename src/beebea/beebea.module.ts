import { Module } from '@nestjs/common';
import { GeneticsModule } from './genetics/genetics.module';

@Module({
  imports: [GeneticsModule],
})
export class BeebeaModule {}
