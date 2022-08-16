import { IsNotEmpty, IsString } from 'class-validator';

export class CreepyNameDto {
  @IsString()
  @IsNotEmpty()
  encodedName!: string;

  @IsString()
  @IsNotEmpty()
  htmlName!: string;
}
