import { Module } from '@nestjs/common';
import { ResepService } from './resep.service';
import { ResepController } from './resep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_resep} from './resep.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BahanbakuresepService } from 'src/resep/bahanbakuresep.service';
import { Tbl_bahanbaku_resep } from './bahanbakuresep.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_resep,Tbl_bahanbaku_resep]),ConfigModule],
  providers: [ResepService,BahanbakuresepService],
  exports: [ResepService,BahanbakuresepService],
  controllers: [ResepController],
})
export class ResepModule { }