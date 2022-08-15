import { Module } from '@nestjs/common';
import { TestingUtilityService } from './testing-utility.service';

// this module is only loaded in the testing module and NOT the app module
@Module({
  providers: [TestingUtilityService],
})
export class TestingUtilityModule {}
