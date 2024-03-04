// import { UsersDocument } from '@app/comman';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UsersDocument } from '@app/comman';

@Resolver(() => UsersDocument)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UsersDocument)
  createUser(@Args('createUserInput') createUserInput: CreateUsersDto) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [UsersDocument], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
