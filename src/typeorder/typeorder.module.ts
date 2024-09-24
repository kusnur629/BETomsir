import { Module } from '@nestjs/common';
import { TypeorderService } from './typeorder.service';
import { TypeorderController } from './typeorder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_type_order} from './typeorder.entity';
import { ViewTypeorderService } from 'src/typeorder/viewtypeorder.service';
import { ViewTypeorder } from './viewtypeorder.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_type_order,ViewTypeorder])],
  providers: [TypeorderService,ViewTypeorderService],
  exports: [TypeorderService,ViewTypeorderService],
  controllers: [TypeorderController],
})
export class TypeorderModule { }