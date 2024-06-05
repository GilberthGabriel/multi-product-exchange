import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Product extends Document {
  @ApiProperty({ example: 'Produto A', description: 'Nome do produto' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'SKU123456', description: 'SKU do produto' })
  @Prop({ required: true, unique: true })
  sku: string;

  @ApiProperty({ example: 99.99, description: 'Preço do produto' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indica se o produto aceita troca expressa',
  })
  @Prop({ required: true })
  acceptsExpressExchange: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
