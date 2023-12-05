import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUsersDto) {
    return await this.usersRepository.create(createUserDto);
  }
}
