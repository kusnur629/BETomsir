import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineModule } from './engine/engine.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


import { Tbl_user } from './users/users.entity';

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
      entities: [ Tbl_user],

    }),

  }),

    AuthModule,

    UsersModule,

  ],



})
export class AppModule { }
