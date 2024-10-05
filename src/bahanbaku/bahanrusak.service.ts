import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_bahan_rusak } from 'src/bahanbaku/bahanrusak.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateBahanrusakDto } from 'src/bahanbaku/dto/create-bahanrusak.dto';

@Injectable()
export class BahanrusakService {
    constructor(
        @InjectRepository(Tbl_bahan_rusak)
        private readonly BahanrusakRepository: Repository<Tbl_bahan_rusak>,
    ) { }
    create(createUsersDto: CreateBahanrusakDto) {
        const newUser = this.BahanrusakRepository.create(createUsersDto);
        return this.BahanrusakRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateBahanrusakDto>) {
        await this.BahanrusakRepository.update({ id }, data);
        return await this.BahanrusakRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.BahanrusakRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.BahanrusakRepository.find();
    }
    findById(id: string) {
        return this.BahanrusakRepository.findOneBy({ id: id });
    }
    findByIdbaku(id_bahan_baku: string) {
        return this.BahanrusakRepository.findBy({ id_bahan_baku: id_bahan_baku });
    }
    findfilter(startdate: Date, enddate: Date, remark: string,skip: number, take: number,id:string,descending:boolean): Promise<Tbl_bahan_rusak[]> {
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

        const query = this.BahanrusakRepository.find(
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