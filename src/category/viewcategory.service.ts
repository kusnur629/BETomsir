import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Viewcategory } from './viewcategory.entity';
import { Between, Like, Repository } from 'typeorm';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class ViewcategoryService {

    constructor(
        @InjectRepository(Viewcategory)
        private readonly ViewcategoryRepository: Repository<Viewcategory>,
    ) { }


    findAll() {
        return this.ViewcategoryRepository.find();
    }
    findById(id: string) {
        return this.ViewcategoryRepository.findOneBy({ id: id });
    }
    findByUsername(name: string) {
        return this.ViewcategoryRepository.findOneBy({ name: name });
    }
 
    findfilter(startdate: Date, enddate: Date, merchant_id:string, name: string,nameMerchant:string,createdByName:string,skip: number, take: number,id:string,descending:boolean): Promise<Viewcategory[]> {
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
        if (nameMerchant !== undefined) {
            object = Object.assign({ nameMerchant: Like ('%'+nameMerchant+'%') }, object);
        }
        if (createdByName !== undefined) {
            object = Object.assign({ createdByName: Like ('%'+createdByName+'%') }, object);
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

        const query = this.ViewcategoryRepository.find(
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