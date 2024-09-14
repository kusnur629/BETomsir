import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_varian } from 'src/varian/varian.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateVarianDto } from 'src/varian/dto/create-varian.dto';

@Injectable()
export class VarianService {
    constructor(
        @InjectRepository(Tbl_varian)
        private readonly VarianRepository: Repository<Tbl_varian>,
    ) { }
    create(createUsersDto: CreateVarianDto) {
        const newUser = this.VarianRepository.create(createUsersDto);
        return this.VarianRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateVarianDto>) {
        await this.VarianRepository.update({ id }, data);
        return await this.VarianRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.VarianRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.VarianRepository.find();
    }
    findById(id: string) {
        return this.VarianRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.VarianRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, remark: string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_varian[]> {
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
       
        if (remark !== undefined) {
            object = Object.assign({ remark: Like ('%'+remark+'%') }, object);
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

        const query = this.VarianRepository.find(
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