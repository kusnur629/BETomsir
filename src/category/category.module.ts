import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_category } from './category.entity';
import { ViewcategoryService } from 'src/category/viewcategory.service';
import { Viewcategory } from './viewcategory.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_category,Viewcategory])],
  providers: [CategoryService,ViewcategoryService],
  exports: [CategoryService,ViewcategoryService],
  controllers: [CategoryController],
})
export class CategoryModule { }