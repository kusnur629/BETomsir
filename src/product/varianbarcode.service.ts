import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product_varian_barcode } from 'src/product/varianbarcode.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateVarianbarcodeDto } from 'src/product/dto/create-varianbarcode.dto';

@Injectable()
export class VarianbarcodeService {
    constructor(
        @InjectRepository(Tbl_product_varian_barcode)
        private readonly VarianbarcodeRepository: Repository<Tbl_product_varian_barcode>,
    ) { }
    create(createUsersDto: CreateVarianbarcodeDto) {
        const newUser = this.VarianbarcodeRepository.create(createUsersDto);
        return this.VarianbarcodeRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateVarianbarcodeDto>) {
        await this.VarianbarcodeRepository.update({ id }, data);
        return await this.VarianbarcodeRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.VarianbarcodeRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.VarianbarcodeRepository.find();
    }
    findById(id: string) {
        return this.VarianbarcodeRepository.findOneBy({ id: id });
    }
    findByname(barcode: string) {
        return this.VarianbarcodeRepository.findOneBy({ barcode: barcode });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product_varian_barcode[]> {
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
            object = Object.assign({ barcode: Like ('%'+name+'%')}, object);
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

        const query = this.VarianbarcodeRepository.find(
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