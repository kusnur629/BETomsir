import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({

    imports: [HttpModule, ConfigModule.forRoot(), 
                TypeOrmModule.forFeature(),
               ],
    controllers: [EngineController],
    providers: [EngineService],
    exports: [EngineService],
})
export class EngineModule {}