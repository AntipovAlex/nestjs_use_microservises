import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UserDecorator } from '../../../../libs/comman/src/decorators/user.decorator';
import { UsersDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUsersDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@UserDecorator() currentUser: UsersDocument) {
    return await currentUser;
  }
}
