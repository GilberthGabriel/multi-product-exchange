import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { ExchangesModule } from './modules/exchanges/exchanges.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CustomersModule,
    ProductsModule,
    ExchangesModule,
  ],
})
export class AppModule {}
