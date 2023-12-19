import { Injectable } from '@nestjs/common';
import { NotifyEmail } from './dto/notifyEmail.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail({ email }: NotifyEmail) {
    console.log(11111, email);
  }
}
