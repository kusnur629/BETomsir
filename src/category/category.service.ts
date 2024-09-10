import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_category } from 'src/category/category.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Tbl_category)
        private readonly CategoryRepository: Repository<Tbl_category>,
    ) { }
    create(CreateCategoryDto: CreateCategoryDto) {
        const newUser = this.CategoryRepository.create(CreateCategoryDto);
        return this.CategoryRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateCategoryDto>) {
        await this.CategoryRepository.update({ id }, data);
        return await this.CategoryRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.CategoryRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.CategoryRepository.find();
    }
    findById(id: string) {
        return this.CategoryRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.CategoryRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, merchant_id: string,phone_number:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_category[]> {
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

        const query = this.CategoryRepository.find(
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