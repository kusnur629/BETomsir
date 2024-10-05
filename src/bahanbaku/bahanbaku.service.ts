import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_bahanbaku } from 'src/bahanbaku/bahanbaku.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateBahanbakuDto } from 'src/bahanbaku/dto/create-bahanbaku.dto';

@Injectable()
export class BahanbakuService {
    constructor(
        @InjectRepository(Tbl_bahanbaku)
        private readonly BahanbakuRepository: Repository<Tbl_bahanbaku>,
    ) { }
    create(createUsersDto: CreateBahanbakuDto) {
        const newUser = this.BahanbakuRepository.create(createUsersDto);
        return this.BahanbakuRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateBahanbakuDto>) {
        await this.BahanbakuRepository.update({ id }, data);
        return await this.BahanbakuRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.BahanbakuRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.BahanbakuRepository.find();
    }
    findById(id: string) {
        return this.BahanbakuRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.BahanbakuRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_bahanbaku[]> {
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

        const query = this.BahanbakuRepository.find(
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