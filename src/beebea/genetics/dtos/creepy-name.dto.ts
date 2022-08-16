import { IsString } from 'class-validator';

export class CreepyNameDto {
  @IsString()
  encodedName!: string;

  @IsString()
  htmlName!: string;
}
