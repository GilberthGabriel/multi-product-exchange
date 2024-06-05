import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: '123', description: 'Número do endereço' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro' })
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty({
    example: 'Apto 101',
    description: 'Complemento (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'SP', description: 'Estado' })
  @IsNotEmpty()
  @IsString()
  uf: string;
}

export class CreateCustomerDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do cliente',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '123.456.789-10', description: 'CPF do cliente' })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    example: 'gilberth@gmail.com',
    description: 'Email do cliente',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '84987200413',
    description: 'Telefone do cliente',
  })
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({ type: [AddressDto], description: 'Endereços do cliente' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}
