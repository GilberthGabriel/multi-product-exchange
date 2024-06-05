import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/entities';
import { Product } from '../../products/entities';

@Schema()
export class Exchange extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  originalProduct: Product;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  newProduct: Product;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  invoiceSeries: string;

  @Prop({ required: true })
  exchangeDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [String], default: [] })
  log: string[];

  @Prop({
    type: [{ date: Date, success: Boolean, error: String }],
    default: [],
  })
  notificationAttempts: { date: Date; success: boolean; error: string }[];
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
