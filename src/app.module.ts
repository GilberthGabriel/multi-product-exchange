import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), CustomersModule],
})
export class AppModule {}
