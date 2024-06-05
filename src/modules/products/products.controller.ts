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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { Product } from './entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos.',
    type: [Product],
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um produto' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do produto.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
