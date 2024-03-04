import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersEntity } from '../models';

export const UserDecorator = createParamDecorator(
  (data: any, context: ExecutionContext): UsersEntity => {
    const request = context.switchToHttp().getRequest();
    if (context.getType() === 'http') {
      return request.user;
    }

    const user = context.getArgs()[2]?.req.headers?.user;

    if (user) {
      return JSON.parse(user);
    }

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
