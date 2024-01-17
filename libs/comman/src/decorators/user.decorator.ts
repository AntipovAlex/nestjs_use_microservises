import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersEntityment } from '../models';

export const UserDecorator = createParamDecorator(
  (data: any, context: ExecutionContext): UsersEntityment => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
