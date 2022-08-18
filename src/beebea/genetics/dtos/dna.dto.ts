import { ArrayNotEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';
export class DnaDto {
  @IsString()
  @IsNotEmpty()
  hex!: string;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  colorValueArray!: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  shapeValueArray!: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  animationValueArray!: number[];

  @IsInt({ each: true })
  @ArrayNotEmpty()
  hiddenValueArray!: number[];
}
