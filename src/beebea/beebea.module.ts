import { Module } from '@nestjs/common';
import { GeneticsModule } from './genetics/genetics.module';
import { GeneticsService } from './genetics/genetics.service';
import { BeebeaService } from './beebea.service';

@Module({
  imports: [GeneticsModule],
  providers: [GeneticsService, BeebeaService],
})
export class BeebeaModule {}
