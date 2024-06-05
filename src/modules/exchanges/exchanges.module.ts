import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { Exchange, ExchangeSchema } from './entities';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    CustomersModule,
    ProductsModule,
    NotificationsModule,
  ],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
