import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_product_barcode } from 'src/product/productbarcode.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateProductbarcodeDto } from 'src/product/dto/create-Productbarcode.dto';

@Injectable()
export class ProductbarcodeService {
    constructor(
        @InjectRepository(Tbl_product_barcode)
        private readonly ProductbarcodeRepository: Repository<Tbl_product_barcode>,
    ) { }
    create(CreateProductbarcodeDto: CreateProductbarcodeDto) {
        const newUser = this.ProductbarcodeRepository.create(CreateProductbarcodeDto);
        return this.ProductbarcodeRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateProductbarcodeDto>) {
        await this.ProductbarcodeRepository.update({ id }, data);
        return await this.ProductbarcodeRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.ProductbarcodeRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.ProductbarcodeRepository.find();
    }
    findbyproduct(product_id:string) {
        return this.ProductbarcodeRepository.findBy({product_id:product_id});
    }
    findById(id: string) {
        return this.ProductbarcodeRepository.findOneBy({ id: id });
    }
    findByname(barcode: string) {
        return this.ProductbarcodeRepository.findOneBy({ barcode: barcode });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_product_barcode[]> {
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

        const query = this.ProductbarcodeRepository.find(
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