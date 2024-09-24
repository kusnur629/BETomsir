import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Request,
    Res,
    UsePipes,
    ValidationPipe, BadRequestException, UseGuards, HttpStatus,
    HttpCode,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { CreateVarianDto } from './dto/create-varian.dto';
import { VarianService } from 'src/varian/varian.service';
import { Tbl_varian } from 'src/varian/varian.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
//
@Controller('api/Varian')
export class VarianController {

    constructor(
        private readonly VarianService: VarianService,
        private readonly configService: ConfigService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_varian[]> {
        return this.VarianService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateVarianDto: CreateVarianDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateVarianDto.id = id;
        CreateVarianDto.createdAt = new Date(Date.now());
        CreateVarianDto.updatedAt = new Date(Date.now());
        if(CreateVarianDto.max_limit !==undefined){
            CreateVarianDto.max_limit=Number(CreateVarianDto.max_limit);
        }
        if(CreateVarianDto.wajib_pilih !==undefined){
            CreateVarianDto.wajib_pilih=Number(CreateVarianDto.wajib_pilih);
        }
        try {
    
            let data = await this.VarianService.create(CreateVarianDto);
            res.status(HttpStatus.OK).json({
                response_code: 202,
                "data": data,
                "message": messages
            });
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({

                "message": messagesEror + e
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Res() res, @Body() CreateVarianDto: CreateVarianDto, @Request() request) {
        const messages = {
            "info": ["The update successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };

        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = null;

        if (request_json["id"] !== undefined) {
            id = request_json["id"];
        } else {
            throw new BadRequestException('Param id is required');
        }
      
        CreateVarianDto.updatedAt = new Date(Date.now());
        if(CreateVarianDto.max_limit !==undefined){
            CreateVarianDto.max_limit=Number(CreateVarianDto.max_limit);
        }
        if(CreateVarianDto.wajib_pilih !==undefined){
            CreateVarianDto.wajib_pilih=Number(CreateVarianDto.wajib_pilih);
        }
        try {
           
            let data = await this.VarianService.update(id,CreateVarianDto);
            res.status(HttpStatus.OK).json({
                response_code: 202,
                "data": data,
                "message": messages
            });
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({

                "message": messagesEror
            });
        }
    }
    @UseGuards(JwtAuthGuard)
    @Post('filter')
    async findWhereCompany(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var remark = null;
        var startdate = null;
        var enddate = null;
        var name = null;
        var data = null;
        var page=null;
        var limit=null;
        var descending=null;
        var id=null;
        var response={};
        id = request_json["id"];
        remark = request_json["remark"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        name = request_json["name"];
        page =Number (request_json["page"]);
        limit =Number (request_json["limit"]);
        descending = request_json["descending"];
        data = await this.VarianService.findfilter(startdate, enddate, name, remark,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }
  
    @UseGuards(JwtAuthGuard)
    @Post('delete/:id')
    async delete(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {

            throw new BadRequestException('Param id is required');
        }
        var data = null;

        try {
            data = await this.VarianService.findById(id);
        } catch (e) {
            data = null;
        }
        if (data && data !== null) {

            try {
                await this.VarianService.destroy(id);
            } catch (e) {
                throw new BadRequestException("Unabled to proceed");
            }
        }

        var response = {
            "response_code": 202,
            "messages": messages
        }
        return response;

    }



}
