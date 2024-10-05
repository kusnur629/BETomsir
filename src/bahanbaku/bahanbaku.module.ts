import { Module } from '@nestjs/common';
import { BahanbakuService } from './bahanbaku.service';
import { BahanbakuController } from './bahanbaku.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_bahanbaku} from './bahanbaku.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BahanrusakService } from 'src/bahanbaku/bahanrusak.service';
import { Tbl_bahan_rusak } from './bahanrusak.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_bahanbaku,Tbl_bahan_rusak]),ConfigModule],
  providers: [BahanbakuService,BahanrusakService],
  exports: [BahanbakuService,BahanrusakService],
  controllers: [BahanbakuController],
})
export class BahanbakuModule { }