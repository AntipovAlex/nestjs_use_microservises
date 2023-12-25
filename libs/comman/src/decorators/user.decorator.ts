import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from '../models';

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
