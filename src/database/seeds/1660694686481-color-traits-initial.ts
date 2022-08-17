import { QueryRunner, Repository } from 'typeorm';
import { ColorTrait } from 'src/beebea/genetics/entities/color-trait.entity';
import { ISeedingInterface } from '../seeding.interface';
import colorTraitJson from './data/color-traits-initial.json';

export class colorTraitsInitial1660694686481 implements ISeedingInterface {
  private async seedColorTraits(queryRunner: QueryRunner) {
    console.log('Seeding Color Traits....');
    const colorTraitRepo: Repository<ColorTrait> = queryRunner.manager.getRepository(ColorTrait);

    console.log(colorTraitJson.length);

    colorTraitJson.forEach(async (colorTrait: any) => {
      const dbBaseColor = await colorTraitRepo.findOne({
        where: { hex: colorTrait.hex },
      });

      // We check if a character name already exists.
      // If it does don't create a new one.
      if (dbBaseColor) {
        console.log('dbBaseColor found', dbBaseColor);
        return Promise.resolve(null);
      }

      const baseColorEntity = await colorTraitRepo.create(colorTrait);
      console.log('baseColorEntity', baseColorEntity);
      return await colorTraitRepo.save(baseColorEntity);
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
    queryRunner.query('DELETE FROM public.color_trait;');
  }
}
