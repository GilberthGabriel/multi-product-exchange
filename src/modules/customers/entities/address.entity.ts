import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Address extends Document {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua' })
  @Prop({ required: true })
  street: string;

  @ApiProperty({ example: '123', description: 'Número do endereço' })
  @Prop({ required: true })
  number: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro' })
  @Prop({ required: true })
  neighborhood: string;

  @ApiProperty({
    example: 'Apto 101',
    description: 'Complemento (opcional)',
    required: false,
  })
  @Prop()
  complement?: string;

  @ApiProperty({ example: 'Natal', description: 'Cidade' })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ example: 'RN', description: 'Estado' })
  @Prop({ required: true })
  uf: string;

  @ApiProperty({ type: () => Customer })
  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: Customer;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
