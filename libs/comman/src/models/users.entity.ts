import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../database';
import { RoleEntity } from './role.entity';

@Entity()
export class UsersEntity extends AbstractEntity<UsersEntity> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, { cascade: true })
  @JoinTable()
  roles?: RoleEntity[];
}
