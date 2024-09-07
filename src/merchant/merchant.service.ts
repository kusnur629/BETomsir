import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_merchant } from 'src/merchant/merchant.entity';
import { Repository } from 'typeorm';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';

@Injectable()
export class MerchantService {
    constructor(
        @InjectRepository(Tbl_merchant)
        private readonly MerchantRepository: Repository<Tbl_merchant>,
    ) { }
    create(createUsersDto: CreateMerchantDto) {
        const newUser = this.MerchantRepository.create(createUsersDto);
        return this.MerchantRepository.save(newUser);
    }
    async update(id: string, data: Partial<CreateMerchantDto>) {
        await this.MerchantRepository.update({ id }, data);
        return await this.MerchantRepository.findOneBy({ id });
      }
      async destroy(id: string) {
        await this.MerchantRepository.delete({ id });
        return { deleted: true };
      }
    findAll() {
        return this.MerchantRepository.find();
    }
    findById(id: string) {
        return this.MerchantRepository.findOneBy({ id: id });
    }
    findByname(name: string) {
        return this.MerchantRepository.findOneBy({ name: name });
    }
  

}