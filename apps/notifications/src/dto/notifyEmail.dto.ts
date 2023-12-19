import { IsEmail } from 'class-validator';

export class NotifyEmail {
  @IsEmail()
  email: string;
}
