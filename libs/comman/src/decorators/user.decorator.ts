import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from '../../../../apps/auth/src/users/models/users.schema';

export const UserDecorator = createParamDecorator(
  (data: any, context: ExecutionContext): UsersDocument => {
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
