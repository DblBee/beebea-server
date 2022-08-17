import { QueryRunner, Repository } from 'typeorm';
import { AnimationTrait } from 'src/beebea/genetics/entities/animation-trait.entity';
import { ISeedingInterface } from '../seeding.interface';
import traitJson from './data/animation-traits-initial.json';

export class animationTraitsInitial1660738283372 implements ISeedingInterface {
  private async seedAnimationTraits(queryRunner: QueryRunner) {
    console.log('Seeding Animation Traits....');
    const traitRepo: Repository<AnimationTrait> = queryRunner.manager.getRepository(AnimationTrait);

    traitJson.forEach(async (trait: any) => {
      const dbBaseTrait = await traitRepo.findOne({
        where: { animation: trait.animation },
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
    await this.seedAnimationTraits(queryRunner);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting Seeding Animation Traits....');
    await queryRunner.query('DELETE FROM public.animation_trait;');
  }
}
