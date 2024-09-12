import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_customer } from 'src/customer/customer.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Tbl_customer)
        private readonly CustomerRepository: Repository<Tbl_customer>,
    ) { }
    create(CreateCustomerDto: CreateCustomerDto) {
        const newUser = this.CustomerRepository.create(CreateCustomerDto);
        return this.CustomerRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateCustomerDto>) {
        await this.CustomerRepository.update({ id }, data);
        return await this.CustomerRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.CustomerRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.CustomerRepository.find();
    }
    findById(id: string) {
        return this.CustomerRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.CustomerRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, merchant_id: string,phone_number:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_customer[]> {
        var object = {};
        var x=0;
        var y=10;
        var order=null;
        if (descending === true) {
            order = "DESC";
        } else {
            order = "ASC";
        }
        if (id !== undefined) {
            object = Object.assign({ id: id }, object);
        }
       
        if (name !== undefined) {
            object = Object.assign({ name: Like ('%'+name+'%')}, object);
        }
       
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (phone_number !== undefined) {
            object = Object.assign({ phone_number: Like ('%'+phone_number+'%') }, object);
        }
        if (startdate !== undefined && enddate !==undefined) {
            object = Object.assign({ createdAt: Between(
                startdate,
                enddate,
            ),}, object);
        }

        if (skip > 0) {
           x= (skip * take) 
        }
        if (take > 0) {
            y= take
         }

        const query = this.CustomerRepository.find(
            {
                where:object,
                order:{createdAt:order},
                skip: x,
                take: y
            },
        );
        return query;
        
      

    }
    
}