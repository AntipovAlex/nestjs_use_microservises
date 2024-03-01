import { Query, Resolver } from '@nestjs/graphql';
import { PaymentsEntet } from './paymentsIntent.intity';
import { PaymentsService } from './payments.service';

@Resolver(() => PaymentsEntet)
export class PaymentsResolver {
  constructor(private readonly paymentService: PaymentsService) {}

  @Query(() => [PaymentsEntet], { name: 'payments' })
  findAll() {
    return this.paymentService.getPayments();
  }
}
