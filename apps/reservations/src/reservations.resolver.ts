import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { User, UserDecorator } from '@app/comman';

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createReservations(
    @Args('createResrrvationInput')
    createReservationInput: CreateReservationDto,
    @UserDecorator() user: User,
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => ReservationDocument)
  remove(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
