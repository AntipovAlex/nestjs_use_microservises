import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
