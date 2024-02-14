import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/createReservation.dto';
import { UpdateReservationDto } from './dto/updateReservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
  UsersEntity,
} from '@app/comman';
import { map } from 'rxjs';
import { ReservationEntity } from './models/reservation.entity';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;
  constructor(
    protected readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService = this.client.getService<PaymentsServiceClient>(
      PAYMENTS_SERVICE_NAME,
    );
  }

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UsersEntity,
  ) {
    return this.paymentsService
      .createCharge({
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          const reservation = new ReservationEntity({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
          return this.reservationRepository.create(reservation);
        }),
      );
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: number) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      updateReservationDto,
    );
  }

  async remove(_id: number) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
