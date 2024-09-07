import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ViewuserService } from 'src/users/viewuser.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_user } from './users.entity';
import { Viewuser } from './viewuser.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_user,Viewuser])],
  providers: [UsersService,ViewuserService],
  exports: [UsersService,ViewuserService],
  controllers: [UsersController],
})
export class UsersModule { }