import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, Address } from './entities';
import { CreateCustomerDto, UpdateCustomerDto, CreateAddressDto } from './dtos';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().populate('addresses').exec();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerModel.findById(id).populate('addresses').exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
  }

  async addAddress(
    customerId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Customer> {
    const address = new this.addressModel(createAddressDto);
    address.customer = customerId as any;
    await address.save();

    return this.customerModel
      .findByIdAndUpdate(
        customerId,
        { $push: { addresses: address._id } },
        { new: true },
      )
      .populate('addresses')
      .exec();
  }

  async remove(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
