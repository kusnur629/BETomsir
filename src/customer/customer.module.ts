import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_customer} from './customer.entity';
import { ViewCustomerService } from 'src/customer/viewcustomer.service';
import { Viewcustomer } from './viewcustomer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_customer,Viewcustomer])],
  providers: [CustomerService,ViewCustomerService],
  exports: [CustomerService,ViewCustomerService],
  controllers: [CustomerController],
})
export class CustomerModule { }