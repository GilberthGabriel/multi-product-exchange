import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExchangeDto } from './dtos';
import { Exchange } from './entities';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { NotificationsService } from '../notifications/notifications.service';
import axios from 'axios';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<Exchange>,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    const {
      customerId,
      originalProductId,
      newProductId,
      invoiceNumber,
      invoiceSeries,
    } = createExchangeDto;

    const exchange = new this.exchangeModel({
      customer: customerId,
      originalProduct: originalProductId,
      newProduct: newProductId,
      invoiceNumber,
      invoiceSeries,
      exchangeDate: new Date(),
      status: 'CREATED',
      log: [],
      notificationAttempts: [],
    });

    try {
      exchange.log.push('Starting exchange process.');
      const customer = await this.customersService.findOne(customerId);
      if (!customer) {
        throw new NotFoundException(`Customer with id ${customerId} not found`);
      }

      exchange.log.push(`Customer ${customerId} validated.`);
      const originalProduct = await this.productsService.findOne(
        originalProductId,
      );

      if (!originalProduct || !originalProduct.acceptsExpressExchange) {
        throw new BadRequestException(
          `Original product with id ${originalProductId} not found or does not accept express exchange`,
        );
      }

      exchange.log.push(`Original product ${originalProductId} validated.`);
      const newProduct = await this.productsService.findOne(newProductId);
      if (!newProduct) {
        throw new NotFoundException(
          `New product with id ${newProductId} not found`,
        );
      }

      exchange.log.push(`New product ${newProductId} validated.`);
      await this.validateStock(newProduct.sku);
      exchange.log.push(`Stock for new product ${newProduct.sku} validated.`);
      await this.validateWarranty(invoiceNumber, invoiceSeries);
      exchange.log.push(
        `Warranty for invoice ${invoiceNumber}-${invoiceSeries} validated.`,
      );

      await this.notificationsService.sendNotification(
        customer.email,
        exchange,
      );

      exchange.log.push(`Notification attempt recorded.`);
      exchange.status = 'COMPLETED';
    } catch (error) {
      exchange.status = 'FAILED';
      exchange.log.push(`Error: ${error.message}`);
      throw new InternalServerErrorException(error.message);
    } finally {
      await exchange.save();
    }

    return exchange;
  }

  private async validateStock(sku: string) {
    const response = await axios.get(
      `https://sac-express-exchanges.wiremockapi.cloud/products/stock?sku=${sku}`,
    );
    if (!response.data.stock) {
      throw new BadRequestException(`Product with SKU ${sku} is not in stock`);
    }
  }

  private async validateWarranty(invoiceNumber: string, invoiceSeries: string) {
    const response = await axios.get(
      `https://sac-express-exchanges.wiremockapi.cloud/invoices/warranty?number=${invoiceNumber}&serie=${invoiceSeries}`,
    );
    if (!response.data.warranty) {
      throw new BadRequestException(
        `Invoice ${invoiceNumber} - ${invoiceSeries} is not in warranty period`,
      );
    }
  }
}
