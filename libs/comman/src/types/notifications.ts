/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface NotifyEmailMessage {
  email: string;
  text: string;
}

export interface Empty {}

export const NOTIFICATIONS_PACKAGE_NAME = 'notifications';

export interface NotificationsClient {
  notifyEmail(request: NotifyEmailMessage): Observable<Empty>;
}

export interface NotificationsController {
  notifyEmail(
    request: NotifyEmailMessage,
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function NotificationsControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['notifyEmail'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Notifications', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Notifications', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const NOTIFICATIONS_SERVICE_NAME = 'Notifications';
