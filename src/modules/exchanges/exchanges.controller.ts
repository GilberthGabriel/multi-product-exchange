import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExchangesService } from './exchanges.service';
import { CreateExchangeDto } from './dtos';
import { Exchange } from './entities';

@ApiTags('exchanges')
@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova troca de produto' })
  @ApiResponse({
    status: 201,
    description: 'Troca criada com sucesso.',
    type: Exchange,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 500, description: 'Erro no servidor.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    return this.exchangesService.create(createExchangeDto);
  }
}
