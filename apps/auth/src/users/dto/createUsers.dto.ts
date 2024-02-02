import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { Type } from 'class-transformer';

export class CreateUsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDto)
  roles?: RoleDto[];
}
