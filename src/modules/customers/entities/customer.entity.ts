import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Customer extends Document {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do cliente',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: '123.456.789-10', description: 'CPF do cliente' })
  @Prop({ required: true, unique: true })
  cpf: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email do cliente',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: '84987200413',
    description: 'Telefone do cliente',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ type: [Address], description: 'Endereços do cliente' })
  @Prop({ type: [{ type: Address }], required: true })
  addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
