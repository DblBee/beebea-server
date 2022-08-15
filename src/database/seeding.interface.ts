import { QueryRunner } from 'typeorm';
import { MigrationInterface } from 'typeorm/migration/MigrationInterface';

export interface ISeedingInterface extends MigrationInterface {
  /**
   * Run the seeding.
   */
  seed(queryRunner: QueryRunner): Promise<any>;
}
