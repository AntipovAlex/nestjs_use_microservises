import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/comman';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
