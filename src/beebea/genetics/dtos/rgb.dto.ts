import { IsInt, IsNotEmpty } from 'class-validator';

export class RGBNumericDto {
  @IsInt()
  @IsNotEmpty()
  r!: number;

  @IsInt()
  @IsNotEmpty()
  g!: number;

  @IsInt()
  @IsNotEmpty()
  b!: number;

  @IsInt()
  @IsNotEmpty()
  a!: number;
}
