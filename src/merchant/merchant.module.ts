import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_merchant } from './merchant.entity';
import { EngineModule } from 'src/engine/engine.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Tbl_merchant]),EngineModule,ConfigModule],
  providers: [MerchantService],
  exports: [MerchantService],
  controllers: [MerchantController],
})
export class MerchantModule { }