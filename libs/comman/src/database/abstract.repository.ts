import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class AbstractRepository<T extends AbstractEntity<T>> {
  protected readonly logger: Logger;
  constructor(
    private readonly entityReporitory: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entite: T): Promise<T> {
    return this.entityManager.save(entite);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entite = await this.entityReporitory.findOne({ where });

    if (!entite) {
      this.logger.warn("Entity don't find with where", entite);
      throw new NotFoundException("Entity don't find");
    }

    return entite;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = this.entityReporitory.update(where, partialEntity);

    if (!(await updateResult).affected) {
      this.logger.warn("Entity don't find with where", where);
      throw new NotFoundException("Entity don't find");
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityReporitory.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    await this.entityReporitory.delete(where);
  }
}
