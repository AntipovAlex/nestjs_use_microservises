import { AbstractRepository, UsersEntity } from '@app/comman';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersEntity> {
  protected readonly Logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(UsersEntity)
    usersRepository: Repository<UsersEntity>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
