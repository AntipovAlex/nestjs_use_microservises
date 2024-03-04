import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUsersDto {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Field()
  password: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}
