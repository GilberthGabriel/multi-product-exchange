import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from './address.entity';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Address' }] })
  addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
