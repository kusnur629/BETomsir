import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product_resep } from 'src/product/resepproduct.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateResepproductDto } from 'src/product/dto/create-resepproduct.dto';

@Injectable()
export class ResepproductService {
    constructor(
        @InjectRepository(Tbl_product_resep)
        private readonly ResepproductRepository: Repository<Tbl_product_resep>,
    ) { }
    create(createUsersDto: CreateResepproductDto) {
        const newUser = this.ResepproductRepository.create(createUsersDto);
        return this.ResepproductRepository.save(newUser);
    }
    findbyproduct(product_id:string) {
        return this.ResepproductRepository.findBy({product_id:product_id});
    }
    async update(id: string, data: Partial<CreateResepproductDto>) {
        await this.ResepproductRepository.update({ id }, data);
        return await this.ResepproductRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.ResepproductRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.ResepproductRepository.find();
    }
    findById(id: string) {
        return this.ResepproductRepository.findOneBy({ id: id });
    }
    findByname(nameResep: string) {
        return this.ResepproductRepository.findOneBy({ nameResep: nameResep });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product_resep[]> {
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
            object = Object.assign({ nameResep: Like ('%'+name+'%')}, object);
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

        const query = this.ResepproductRepository.find(
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