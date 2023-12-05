import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/createUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUsersDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
