import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;
}
