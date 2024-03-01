import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentsEntet {
  @Field()
  id: string;

  @Field()
  amound: number;
}
