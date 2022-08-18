import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimationTrait } from './entities/animation-trait.entity';
import { ColorTrait } from './entities/color-trait.entity';
import { ShapeTrait } from './entities/shape-trait.entity';
import { GeneticsService } from './genetics.service';
import { ImageGenerator } from './providers/image-generator.provider';

@Module({
  imports: [TypeOrmModule.forFeature([AnimationTrait, ColorTrait, ShapeTrait])],
  providers: [GeneticsService, ImageGenerator],
  exports: [GeneticsService],
})
export class GeneticsModule {}
