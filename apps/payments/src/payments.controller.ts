import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from './dto/paymentCreateCharge.dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/comman';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(data: PaymentsCreateChargeDto) {
    return await this.paymentsService.createCharge(data);
  }
}
