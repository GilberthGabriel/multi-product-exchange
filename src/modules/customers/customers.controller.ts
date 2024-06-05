import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateAddressDto, CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { Customer } from './entities';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes.',
    type: [Customer],
  })
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do cliente.',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Post(':id/addresses')
  @ApiOperation({ summary: 'Adicionar um endereço' })
  @ApiResponse({ status: 200, description: 'Endereço adicionado com sucesso.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  addAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Customer> {
    return this.customersService.addAddress(id, createAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um cliente' })
  @ApiResponse({ status: 200, description: 'Cliente deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  remove(@Param('id') id: string): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
