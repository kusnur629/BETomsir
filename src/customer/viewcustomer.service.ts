import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Viewcustomer } from './viewcustomer.entity';
import { Between, Like, Repository } from 'typeorm';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class ViewCustomerService {

    constructor(
        @InjectRepository(Viewcustomer)
        private readonly ViewCustomerRepository: Repository<Viewcustomer>,
    ) { }


    findAll() {
        return this.ViewCustomerRepository.find();
    }
    findById(id: string) {
        return this.ViewCustomerRepository.findOneBy({ id: id });
    }
    findByUsername(name: string) {
        return this.ViewCustomerRepository.findOneBy({ name: name });
    }
 
    findfilter(startdate: Date, enddate: Date, merchant_id:string, name: string,nameMerchant:string,phone_number:string,email:string,skip: number, take: number,id:string,descending:boolean): Promise<Viewcustomer[]> {
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
        if (email !== undefined) {
            object = Object.assign({ email: Like ('%'+email+'%')}, object);
        }
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (nameMerchant !== undefined) {
            object = Object.assign({ nameMerchant: Like ('%'+nameMerchant+'%') }, object);
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

        const query = this.ViewCustomerRepository.find(
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