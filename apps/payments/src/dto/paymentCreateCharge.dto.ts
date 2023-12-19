import { CreateChargeDto } from '@app/comman';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
