import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  number: string;
}
