import { Module } from '@nestjs/common';
import { GeneticsModule } from './genetics/genetics.module';
import { BeeBeaService } from './beebea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeeBea } from './entities/beebea.entity';
import { BeeBeaChild } from './entities/beebea-child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeeBea, BeeBeaChild]), GeneticsModule],
  providers: [BeeBeaService],
  exports: [BeeBeaService],
})
export class BeeBeaModule {}
