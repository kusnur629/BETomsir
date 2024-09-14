import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_satuan } from 'src/satuan/satuan.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateSatuanDto } from 'src/satuan/dto/create-satuan.dto';

@Injectable()
export class SatuanService {
    constructor(
        @InjectRepository(Tbl_satuan)
        private readonly SatuanRepository: Repository<Tbl_satuan>,
    ) { }
    create(createUsersDto: CreateSatuanDto) {
        const newUser = this.SatuanRepository.create(createUsersDto);
        return this.SatuanRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateSatuanDto>) {
        await this.SatuanRepository.update({ id }, data);
        return await this.SatuanRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.SatuanRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.SatuanRepository.find();
    }
    findById(id: string) {
        return this.SatuanRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.SatuanRepository.findOneBy({ name: name });
    }
    findfilter(startdate: Date, enddate: Date, name:string, remark: string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_satuan[]> {
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

        const query = this.SatuanRepository.find(
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