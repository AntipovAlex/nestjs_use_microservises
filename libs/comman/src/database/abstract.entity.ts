import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  _id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
