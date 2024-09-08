import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_merchant } from 'src/merchant/merchant.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';

@Injectable()
export class MerchantService {
    constructor(
        @InjectRepository(Tbl_merchant)
        private readonly MerchantRepository: Repository<Tbl_merchant>,
    ) { }
    create(createUsersDto: CreateMerchantDto) {
        const newUser = this.MerchantRepository.create(createUsersDto);
        return this.MerchantRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateMerchantDto>) {
        await this.MerchantRepository.update({ id }, data);
        return await this.MerchantRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.MerchantRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.MerchantRepository.find();
    }
    findById(id: string) {
        return this.MerchantRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.MerchantRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, address: string,phone_number:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_merchant[]> {
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
       
        if (address !== undefined) {
            object = Object.assign({ address: Like ('%'+address+'%') }, object);
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

        const query = this.MerchantRepository.find(
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