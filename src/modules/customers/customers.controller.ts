import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto, CreateAddressDto } from './dtos';
import { Customer } from './entities';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Post(':id/addresses')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  addAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Customer> {
    return this.customersService.addAddress(id, createAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
