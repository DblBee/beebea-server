import path from 'path';
import * as fs from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class getNextMintNumberFunction1660747053347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating getnextmintnumber Function....');
    const fileContents = fs.readFileSync(
      path.join(__dirname, '../functions/getnextmintnumber.sql'),
    );
    return queryRunner.query(fileContents.toString());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting getNextMintNumber Function....');
    await queryRunner.query('DROP FUNCTION IF EXISTS public.getnextmintnumber();');
  }
}
