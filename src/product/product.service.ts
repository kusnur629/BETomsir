import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product } from 'src/product/product.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Tbl_product)
        private readonly ProductRepository: Repository<Tbl_product>,
    ) { }
    create(createUsersDto: CreateProductDto) {
        const newUser = this.ProductRepository.create(createUsersDto);
        return this.ProductRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateProductDto>) {
        await this.ProductRepository.update({ id }, data);
        return await this.ProductRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.ProductRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.ProductRepository.find();
    }
    findById(id: string) {
        return this.ProductRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.ProductRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product[]> {
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

        const query = this.ProductRepository.find(
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