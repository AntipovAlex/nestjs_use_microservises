/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface CardMessage {
  cvc: string;
  expMonth: number;
  expYear: number;
  number: string;
}

export interface CreateChargeMessage {
  email: string;
  amount: number;
  card: CardMessage | undefined;
}

export interface CreateChargeResponse {
  id: string;
}

export const PAYMENTS_PACKAGE_NAME = 'payments';

export interface PaymentsClient {
  createCharge(request: CreateChargeMessage): Observable<CreateChargeResponse>;
}

export interface PaymentsController {
  createCharge(
    request: CreateChargeMessage,
  ):
    | Promise<CreateChargeResponse>
    | Observable<CreateChargeResponse>
    | CreateChargeResponse;
}

export function PaymentsControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createCharge'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Payments', method)(
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
      GrpcStreamMethod('Payments', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PAYMENTS_SERVICE_NAME = 'Payments';
