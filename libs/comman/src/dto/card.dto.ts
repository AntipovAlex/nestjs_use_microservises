import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CardMessage } from '../types';

export class CardDto implements CardMessage {
  @IsString()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  expYear: number;

  @IsString()
  @IsNotEmpty()
  number: string;
}
