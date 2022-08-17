import { QueryRunner, Repository } from 'typeorm';
import { ColorTrait } from 'src/beebea/genetics/entities/color-trait.entity';
import { ISeedingInterface } from '../seeding.interface';
import traitJson from './data/color-traits-initial.json';

export class colorTraitsInitial1660694686481 implements ISeedingInterface {
  private async seedColorTraits(queryRunner: QueryRunner) {
    console.log('Seeding Color Traits....');
    const traitRepo: Repository<ColorTrait> = queryRunner.manager.getRepository(ColorTrait);

    traitJson.forEach(async (trait: any) => {
      const dbBaseTrait = await traitRepo.findOne({
        where: { hex: trait.hex },
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
    await this.seedColorTraits(queryRunner);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting Seeding Color Traits....');
    await queryRunner.query('DELETE FROM public.color_trait;');
  }
}
