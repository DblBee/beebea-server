import { Module } from '@nestjs/common';
import { TestingUtilityService } from './testing-utility.service';

@Module({
  providers: [TestingUtilityService],
})
export class TestingUtilityModule {}
