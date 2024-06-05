import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entity';

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop()
  complement?: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  uf: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: Customer;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
