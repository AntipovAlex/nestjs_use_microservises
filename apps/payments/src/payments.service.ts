import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/comman';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/paymentCreateCharge.dto';

@Injectable()
export class PaymentsService {
  private notificationsService: NotificationsServiceClient;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-10-16' },
  );

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 10,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      automatic_payment_methods: { allow_redirects: 'never', enabled: true },
    });

    if (!this.notificationsService) {
      this.notificationsService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    }

    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of $${amount} has completed succcessully`,
      })
      .subscribe(() => {});

    return paymentIntent;
  }
}
