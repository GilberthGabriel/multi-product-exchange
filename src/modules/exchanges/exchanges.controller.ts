import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { CreateExchangeDto } from './dtos/create-exchange.dto';
import { Exchange } from './entities';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(
    @Body() createExchangeDto: CreateExchangeDto,
  ): Promise<Exchange> {
    return this.exchangesService.create(createExchangeDto);
  }
}
