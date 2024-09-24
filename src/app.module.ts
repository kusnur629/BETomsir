import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineModule } from './engine/engine.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MerchantModule } from './merchant/merchant.module';
import { Tbl_merchant } from './merchant/merchant.entity';
import { Tbl_user } from './users/users.entity';
import { Viewuser } from './users/viewuser.entity';
import { Viewcategory } from './category/viewcategory.entity';
import { CategoryModule } from './category/category.module';
import { Tbl_category } from 'src/category/category.entity';
import { Tbl_customer } from 'src/customer/customer.entity';
import { Viewcustomer } from './customer/viewcustomer.entity';
import { CustomerModule } from './customer/customer.module';
import { SatuanModule } from './satuan/satuan.module';
import { Tbl_satuan } from 'src/satuan/satuan.entity';
import { TypeorderModule } from './typeorder/typeorder.module';
import { Tbl_type_order } from 'src/typeorder/typeorder.entity';
import { ViewTypeorder } from './typeorder/viewtypeorder.entity';
import { VarianModule } from './varian/varian.module';
import { Tbl_varian } from 'src/varian/varian.entity';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),EngineModule,

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [ Tbl_user,Viewuser,Tbl_merchant,Viewcategory,Tbl_category,Tbl_customer,Viewcustomer,Tbl_satuan,Tbl_varian,Tbl_type_order,ViewTypeorder],

    }),

  }),

    AuthModule,
    UsersModule,
    MerchantModule,
    CategoryModule,
    CustomerModule,
    SatuanModule,
    VarianModule,
    TypeorderModule

  ],



})
export class AppModule { }
