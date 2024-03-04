import { RoleEntity } from '../models';

export interface User {
  _id: string;
  email: string;
  password: string;
  roles?: RoleEntity[];
}
