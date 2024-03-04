import { AbstractDocument } from '@app/comman';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class UsersDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
