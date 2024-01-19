import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsNumber()
  @IsOptional()
  _id?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
