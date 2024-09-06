import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_user } from './users.entity';
import { Between, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Tbl_user)
        private readonly usersRepository: Repository<Tbl_user>,
    ) { }

    create(createUsersDto: CreateUsersDto) {
        const newUser = this.usersRepository.create(createUsersDto);
        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find();
    }
    findById(id: number) {
        return this.usersRepository.findOneBy({ id: id });
    }
    findByUsername(userName: string) {
        return this.usersRepository.findOneBy({ fullname: userName });
    }
    findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email: email });
    }
 
    findfilter(startdate: Date, enddate: Date, merchant_id:string, fullname: string,email:string,role:string,skip: number, take: number,id:string): Promise<Tbl_user[]> {
        var object = {};
        var x=0;
        var y=10;
  
        if (id !== undefined) {
            object = Object.assign({ id: id }, object);
        }
        if (fullname !== undefined) {
            object = Object.assign({ fullname: fullname }, object);
        }
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (email !== undefined) {
            object = Object.assign({ email: email }, object);
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

        const query = this.usersRepository.find(
            {
                where:object,
                skip: x,
                take: y
            },
        );
        return query;
        
      

    }
    
}