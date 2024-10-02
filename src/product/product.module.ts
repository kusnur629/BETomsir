import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_product} from './product.entity';
import { EngineModule } from 'src/engine/engine.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VarianproductService } from 'src/product/varianproduct.service';
import { Tbl_product_varian } from './varianproduct.entity';
import { ProductbarcodeService } from 'src/product/productbarcode.service';
import { Tbl_product_barcode } from './productbarcode.entity';
import { VarianbarcodeService } from 'src/product/varianbarcode.service';
import { Tbl_product_varian_barcode } from './varianbarcode.entity';
import { ResepproductService } from 'src/product/resepproduct.service';
import { Tbl_product_resep } from './resepproduct.entity';
import { BahanbakuproductService } from 'src/product/bahanbakuproduct.service';
import { Tbl_product_bahanbaku } from './bahanbakuproduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_product,Tbl_product_varian,Tbl_product_barcode,Tbl_product_varian_barcode,Tbl_product_resep,Tbl_product_bahanbaku]),EngineModule,ConfigModule],
  providers: [ProductService,VarianproductService,ProductbarcodeService,VarianbarcodeService,ResepproductService,BahanbakuproductService],
  exports: [ProductService,VarianproductService,ProductbarcodeService,VarianbarcodeService,ResepproductService,BahanbakuproductService],
  controllers: [ProductController],
})
export class ProductModule { }