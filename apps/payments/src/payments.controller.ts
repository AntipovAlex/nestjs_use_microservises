import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/paymentCreateCharge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(
    @Payload() data: PaymentsCreateChargeDto,
    @Ctx() contex: RmqContext,
  ) {
    const channel = contex.getChannelRef();
    const originMsg = contex.getMessage();

    channel.ack(originMsg);

    return await this.paymentsService.createCharge(data);
  }
}
