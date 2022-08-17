import { QueryRunner, Repository } from 'typeorm';
import { ShapeTrait } from 'src/beebea/genetics/entities/shape-trait.entity';
import { ISeedingInterface } from '../seeding.interface';
import traitJson from './data/shape-traits-initial.json';

export class shapeTraitsInitial1660736771946 implements ISeedingInterface {
  private async seedShapeTraits(queryRunner: QueryRunner) {
    console.log('Seeding Shape Traits....');
    const traitRepo: Repository<ShapeTrait> = queryRunner.manager.getRepository(ShapeTrait);

    traitJson.forEach(async (trait: any) => {
      const dbBaseTrait = await traitRepo.findOne({
        where: { shape: trait.shape },
      });

      if (dbBaseTrait) {
        console.log('dbBaseTrait found', dbBaseTrait);
        return;
      }

      const baseEntity = traitRepo.create(trait);

      await traitRepo.save(baseEntity);
    });
  }

  public async seed(queryRunner: QueryRunner): Promise<void> {
    await this.seedShapeTraits(queryRunner);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting Seeding Shape Traits....');
    await queryRunner.query('DELETE FROM public.shape_trait;');
  }
}
