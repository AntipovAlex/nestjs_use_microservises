import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';

@Entity()
export class RoleEntity extends AbstractEntity<RoleEntity> {
  @Column()
  name: string;
}
