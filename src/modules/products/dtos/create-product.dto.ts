import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Produto A', description: 'Nome do produto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'SKU123456', description: 'SKU do produto' })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({ example: 99.99, description: 'Preço do produto' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indica se o produto aceita troca expressa',
  })
  @IsNotEmpty()
  @IsBoolean()
  acceptsExpressExchange: boolean;
}
