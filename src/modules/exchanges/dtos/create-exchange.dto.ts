import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExchangeDto {
  @ApiProperty({
    example: '60f5f3a8c6b9a2a9c1e7a1d2',
    description: 'ID do cliente',
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    example: '60f5f3a8c6b9a2a9c1e7a1d3',
    description: 'ID do produto original',
  })
  @IsNotEmpty()
  @IsString()
  originalProductId: string;

  @ApiProperty({
    example: '60f5f3a8c6b9a2a9c1e7a1d4',
    description: 'ID do novo produto',
  })
  @IsNotEmpty()
  @IsString()
  newProductId: string;

  @ApiProperty({ example: '123456789', description: 'Número da nota fiscal' })
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty({ example: '001', description: 'Série da nota fiscal' })
  @IsNotEmpty()
  @IsString()
  invoiceSeries: string;
}
