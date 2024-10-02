import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product_varian } from 'src/product/varianproduct.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateVarianproductDto } from 'src/product/dto/create-varianproduct.dto';

@Injectable()
export class VarianproductService {
    constructor(
        @InjectRepository(Tbl_product_varian)
        private readonly VarianproductRepository: Repository<Tbl_product_varian>,
    ) { }
    create(createUsersDto: CreateVarianproductDto) {
        const newUser = this.VarianproductRepository.create(createUsersDto);
        return this.VarianproductRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateVarianproductDto>) {
        await this.VarianproductRepository.update({ id }, data);
        return await this.VarianproductRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.VarianproductRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.VarianproductRepository.find();
    }
    findById(id: string) {
        return this.VarianproductRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.VarianproductRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product_varian[]> {
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

        const query = this.VarianproductRepository.find(
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