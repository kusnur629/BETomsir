import { Module } from '@nestjs/common';
import { VarianService } from './varian.service';
import { VarianController } from './varian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_varian} from './varian.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_varian]),ConfigModule],
  providers: [VarianService],
  exports: [VarianService],
  controllers: [VarianController],
})
export class VarianModule { }