import { Module } from '@nestjs/common';
import { SatuanService } from './satuan.service';
import { SatuanController } from './satuan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_satuan} from './satuan.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_satuan]),ConfigModule],
  providers: [SatuanService],
  exports: [SatuanService],
  controllers: [SatuanController],
})
export class SatuanModule { }