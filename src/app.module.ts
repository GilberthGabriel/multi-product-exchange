import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { ExchangesModule } from './modules/exchanges/exchanges.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://potidev:TmKiNKuyq1uedwNn@cluster0.odd3ug2.mongodb.net/multitech' ||
        process.env.MONGO_URI,
    ),
    CustomersModule,
    ProductsModule,
    ExchangesModule,
  ],
})
export class AppModule {}
