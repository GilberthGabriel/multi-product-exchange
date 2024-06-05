import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateExchangeDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsMongoId()
  @IsNotEmpty()
  originalProductId: string;

  @IsMongoId()
  @IsNotEmpty()
  newProductId: string;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  invoiceSeries: string;
}
