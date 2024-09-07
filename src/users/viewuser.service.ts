import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Viewuser } from './viewuser.entity';
import { Between, Like, Repository } from 'typeorm';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class ViewuserService {

    constructor(
        @InjectRepository(Viewuser)
        private readonly viewuserRepository: Repository<Viewuser>,
    ) { }


    findAll() {
        return this.viewuserRepository.find();
    }
    findById(id: number) {
        return this.viewuserRepository.findOneBy({ id: id });
    }
    findByUsername(userName: string) {
        return this.viewuserRepository.findOneBy({ fullname: userName });
    }
    findByEmail(email: string) {
        return this.viewuserRepository.findOneBy({ email: email });
    }
 
    findfilter(startdate: Date, enddate: Date, merchant_id:string, fullname: string,email:string,role:string,skip: number, take: number,id:string,name:string,descending:boolean): Promise<Viewuser[]> {
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
        if (fullname !== undefined) {
            object = Object.assign({ fullname: Like ('%'+fullname+'%') }, object);
        }
        if (name !== undefined) {
            object = Object.assign({ name: Like ('%'+name+'%')}, object);
        }
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (email !== undefined) {
            object = Object.assign({ email: Like ('%'+email+'%') }, object);
        }
        if (role !== undefined) {
            object = Object.assign({ role: role }, object);
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

        const query = this.viewuserRepository.find(
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