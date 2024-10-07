import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_bahanbaku_resep } from 'src/resep/bahanbakuresep.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateBahanbakuresepDto } from 'src/resep/dto/create-bahanbakuresep.dto';

@Injectable()
export class BahanbakuresepService {
    constructor(
        @InjectRepository(Tbl_bahanbaku_resep)
        private readonly BahanbakuresepRepository: Repository<Tbl_bahanbaku_resep>,
    ) { }
    create(createUsersDto: CreateBahanbakuresepDto) {
        const newUser = this.BahanbakuresepRepository.create(createUsersDto);
        return this.BahanbakuresepRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateBahanbakuresepDto>) {
        await this.BahanbakuresepRepository.update({ id }, data);
        return await this.BahanbakuresepRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.BahanbakuresepRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.BahanbakuresepRepository.find();
    }
    findById(id: string) {
        return this.BahanbakuresepRepository.findOneBy({ id: id });
    }
    findByIdResep(idResep: string) {
        return this.BahanbakuresepRepository.findBy({ id_resep: idResep });
    }
    findfilter(startdate: Date, enddate: Date, nameBahan: string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_bahanbaku_resep[]> {
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
       
        if (nameBahan !== undefined) {
            object = Object.assign({ nameBahan: Like ('%'+nameBahan+'%') }, object);
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

        const query = this.BahanbakuresepRepository.find(
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