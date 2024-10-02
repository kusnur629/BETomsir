import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product_bahanbaku } from 'src/product/bahanbakuproduct.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateBahanbakuproductDto } from 'src/product/dto/create-bahanbakuproduct.dto';

@Injectable()
export class BahanbakuproductService {
    constructor(
        @InjectRepository(Tbl_product_bahanbaku)
        private readonly BahanbakuproductRepository: Repository<Tbl_product_bahanbaku>,
    ) { }
    create(createUsersDto: CreateBahanbakuproductDto) {
        const newUser = this.BahanbakuproductRepository.create(createUsersDto);
        return this.BahanbakuproductRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateBahanbakuproductDto>) {
        await this.BahanbakuproductRepository.update({ id }, data);
        return await this.BahanbakuproductRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.BahanbakuproductRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.BahanbakuproductRepository.find();
    }
    findById(id: string) {
        return this.BahanbakuproductRepository.findOneBy({ id: id });
    }
    findByname(nameBahan: string) {
        return this.BahanbakuproductRepository.findOneBy({ nameBahan: nameBahan });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product_bahanbaku[]> {
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
            object = Object.assign({ nameBahan: Like ('%'+name+'%')}, object);
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

        const query = this.BahanbakuproductRepository.find(
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