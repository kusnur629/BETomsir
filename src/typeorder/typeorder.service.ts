import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_type_order } from 'src/typeorder/typeorder.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateTypeorderDto } from 'src/typeorder/dto/create-typeorder.dto';

@Injectable()
export class TypeorderService {
    constructor(
        @InjectRepository(Tbl_type_order)
        private readonly TypeorderRepository: Repository<Tbl_type_order>,
    ) { }
    create(CreateTypeorderDto: CreateTypeorderDto) {
        const newUser = this.TypeorderRepository.create(CreateTypeorderDto);
        return this.TypeorderRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateTypeorderDto>) {
        await this.TypeorderRepository.update({ id }, data);
        return await this.TypeorderRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.TypeorderRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.TypeorderRepository.find();
    }
    findById(id: string) {
        return this.TypeorderRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.TypeorderRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, merchant_id: string,phone_number:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_type_order[]> {
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

        const query = this.TypeorderRepository.find(
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