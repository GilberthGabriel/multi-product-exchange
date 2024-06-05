import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customers/entities';
import { Product } from '../../products/entities';

class NotificationAttempt {
  @ApiProperty({
    example: new Date(),
    description: 'Data da tentativa de notificação',
  })
  date: Date;

  @ApiProperty({
    example: true,
    description: 'Sucesso da tentativa de notificação',
  })
  success: boolean;

  @ApiProperty({
    example: 'Erro de conexão',
    description: 'Erro ocorrido durante a tentativa de notificação',
  })
  error: string;
}

@Schema()
export class Exchange extends Document {
  @ApiProperty({ type: String, description: 'ID do cliente' })
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @ApiProperty({ type: String, description: 'ID do produto original' })
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  originalProduct: Product;

  @ApiProperty({ type: String, description: 'ID do novo produto' })
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  newProduct: Product;

  @ApiProperty({ example: '123456789', description: 'Número da nota fiscal' })
  @Prop({ required: true })
  invoiceNumber: string;

  @ApiProperty({ example: '001', description: 'Série da nota fiscal' })
  @Prop({ required: true })
  invoiceSeries: string;

  @ApiProperty({ example: new Date(), description: 'Data da troca' })
  @Prop({ required: true })
  exchangeDate: Date;

  @ApiProperty({ example: 'COMPLETED', description: 'Status da troca' })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ type: [String], description: 'Logs da troca' })
  @Prop({ type: [String], default: [] })
  log: string[];

  @ApiProperty({
    type: [NotificationAttempt],
    description: 'Tentativas de notificação',
  })
  @Prop({
    type: [{ date: Date, success: Boolean, error: String }],
    default: [],
  })
  notificationAttempts: NotificationAttempt[];
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
