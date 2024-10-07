import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_resep } from 'src/resep/resep.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateResepDto } from 'src/resep/dto/create-resep.dto';

@Injectable()
export class ResepService {
    constructor(
        @InjectRepository(Tbl_resep)
        private readonly ResepRepository: Repository<Tbl_resep>,
    ) { }
    create(createUsersDto: CreateResepDto) {
        const newUser = this.ResepRepository.create(createUsersDto);
        return this.ResepRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateResepDto>) {
        await this.ResepRepository.update({ id }, data);
        return await this.ResepRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.ResepRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.ResepRepository.find();
    }
    findById(id: string) {
        return this.ResepRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.ResepRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_resep[]> {
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

        const query = this.ResepRepository.find(
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