import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, UsersDocument, UsersSchema } from '@app/comman';
import { UsersRepository } from './users.repository';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UsersSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
