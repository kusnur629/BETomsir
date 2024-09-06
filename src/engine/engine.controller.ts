import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EngineService } from './engine.service';

@Controller('api/engine')
export class EngineController {
    constructor(private readonly engineService: EngineService) { }

}