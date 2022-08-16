import { ArrayNotEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';
export class DnaDto {
  @IsString()
  @IsNotEmpty()
  hex!: string;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  valueArray!: number[];
}
