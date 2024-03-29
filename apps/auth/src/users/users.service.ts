import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUsersDto) {
    await this.checkEmailUser(createUserDto);
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 8),
    });
  }

  private async checkEmailUser(createUserDto: CreateUsersDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcryptjs.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('This password not valid');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  async findAll() {
    return this.usersRepository.find({});
  }
}
