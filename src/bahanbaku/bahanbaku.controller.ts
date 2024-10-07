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
import { CreateBahanbakuDto } from './dto/create-bahanbaku.dto';
import { BahanbakuService } from 'src/bahanbaku/bahanbaku.service';
import { Tbl_bahanbaku } from 'src/bahanbaku/bahanbaku.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { BahanrusakService } from 'src/bahanbaku/bahanrusak.service';
import { CreateBahanrusakDto } from 'src/bahanbaku/dto/create-bahanrusak.dto';
//
@Controller('api/bahanbaku')
export class BahanbakuController {

    constructor(
        private readonly BahanbakuService: BahanbakuService,
        private readonly BahanrusakService: BahanrusakService,
        private readonly configService: ConfigService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_bahanbaku[]> {
        return this.BahanbakuService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateBahanbakuDto: CreateBahanbakuDto, @Request() request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        var tBahanrusak=[];
        var bahanrusak=null;
        var formatbahanrusak=null;

        bahanrusak = request_json["bahanrusak"];
        CreateBahanbakuDto.id = id;
        CreateBahanbakuDto.createdAt = new Date(Date.now());
        CreateBahanbakuDto.updatedAt = new Date(Date.now());

        if(CreateBahanbakuDto.stock !==undefined){
            CreateBahanbakuDto.stock =Number(CreateBahanbakuDto.stock )
        }
        if(CreateBahanbakuDto.is_stock !==undefined){
            CreateBahanbakuDto.is_stock =Number(CreateBahanbakuDto.is_stock )
        }
        if(CreateBahanbakuDto.is_minus_stock !==undefined){
            CreateBahanbakuDto.is_minus_stock =Number(CreateBahanbakuDto.is_minus_stock )
        }
        if(CreateBahanbakuDto.qty_plus_minus !==undefined){
            CreateBahanbakuDto.qty_plus_minus =Number(CreateBahanbakuDto.qty_plus_minus )
        }
        if(CreateBahanbakuDto.harga !==undefined){
            CreateBahanbakuDto.harga =Number(CreateBahanbakuDto.harga )
        }
        if(bahanrusak !==undefined){
            try{
                this.bahanrusak(id,bahanrusak)
            }catch(e){
    
            }
        }
       
        try {
    
            let data = await this.BahanbakuService.create(CreateBahanbakuDto);

           
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
    async update(@Res() res, @Body() CreateBahanbakuDto: CreateBahanbakuDto, @Request() request) {
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
      
        CreateBahanbakuDto.updatedAt = new Date(Date.now());
        if(CreateBahanbakuDto.stock !==undefined){
            CreateBahanbakuDto.stock =Number(CreateBahanbakuDto.stock )
        }
        if(CreateBahanbakuDto.is_stock !==undefined){
            CreateBahanbakuDto.is_stock =Number(CreateBahanbakuDto.is_stock )
        }
        if(CreateBahanbakuDto.is_minus_stock !==undefined){
            CreateBahanbakuDto.is_minus_stock =Number(CreateBahanbakuDto.is_minus_stock )
        }
        if(CreateBahanbakuDto.qty_plus_minus !==undefined){
            CreateBahanbakuDto.qty_plus_minus =Number(CreateBahanbakuDto.qty_plus_minus )
        }
        if(CreateBahanbakuDto.harga !==undefined){
            CreateBahanbakuDto.harga =Number(CreateBahanbakuDto.harga )
        }
        try {
           
            let data = await this.BahanbakuService.update(id,CreateBahanbakuDto);
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
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        name = request_json["name"];
        page =Number (request_json["page"]);
        limit =Number (request_json["limit"]);
        descending = request_json["descending"];
        data = await this.BahanbakuService.findfilter(startdate, enddate, name,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }
    @UseGuards(JwtAuthGuard)
    @Post('detail')
    async findWhereCompany3(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
       var data=null;
        var id=null;
        var response={};
        id = request_json["id"];
      
        data = await this.BahanbakuService.findById(id);

        if(data !==null){

            let bahanrusak=[];

            try{
                bahanrusak= await this.BahanrusakService.findByIdbaku(id)
            }catch(e){
                bahanrusak=[]
            }
            data.bahanrusak=bahanrusak;
 
        }
        response={
            "data":data,
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
            data = await this.BahanbakuService.findById(id);
        } catch (e) {
            data = null;
        }
        if (data && data !== null) {

            try {
                await this.BahanbakuService.destroy(id);
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

    @UseGuards(JwtAuthGuard)
    @Post('bahanrusak/create')
    async create2(@Res() res, @Body() CreateBahanrusakDto: CreateBahanrusakDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateBahanrusakDto.id = id;
        CreateBahanrusakDto.createdAt = new Date(Date.now());
        CreateBahanrusakDto.updatedAt = new Date(Date.now());
        if(CreateBahanrusakDto.qty !==undefined){
            CreateBahanrusakDto.qty=Number(CreateBahanrusakDto.qty)
        }
        try {
    
            let data = await this.BahanrusakService.create(CreateBahanrusakDto);
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
    @Post('bahanrusak/update')
    async update3(@Res() res, @Body() CreateBahanrusakDto: CreateBahanrusakDto, @Request() request) {
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
      
        CreateBahanrusakDto.updatedAt = new Date(Date.now());
        if(CreateBahanrusakDto.qty !==undefined){
            CreateBahanrusakDto.qty=Number(CreateBahanrusakDto.qty)
        }
        try {
           
            let data = await this.BahanrusakService.update(id,CreateBahanrusakDto);
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
    @Post('bahanrusak/detail')
    async findWhereCompany5(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
       var data=null;
        var id=null;
        var response={};
        id = request_json["id"];
      
        try{
        data = await this.BahanrusakService.findById(id)
        }catch(e){
            data=null;
        }

       
        response={
            "data":data,
            "messages":messages
        }
        return response;

    }
    @UseGuards(JwtAuthGuard)
    @Post('bahanrusak/delete/:id')
    async delete2(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.BahanrusakService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.BahanrusakService.destroy(id);
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

    async bahanrusak(idBahanbaku:string,tBahanrusak:any[]){
        if(tBahanrusak.length>0){
            for(let i=0;i<tBahanrusak.length;i++){
                let remark=null;
                let qty=0;

                try{
                    remark=tBahanrusak[i].remark
                }catch(e){
                    remark=null;
                }
                try{
                    qty=tBahanrusak[i].qty
                }catch(e){
                    qty=0;
                }
             
                let Tbl_product_bahanbaku_=new CreateBahanrusakDto()
                Tbl_product_bahanbaku_.remark=remark;
                Tbl_product_bahanbaku_.id_bahan_baku=idBahanbaku;
                Tbl_product_bahanbaku_.id=uuidv4();
                Tbl_product_bahanbaku_.createdAt=new Date(Date.now());
                Tbl_product_bahanbaku_.updatedAt=new Date(Date.now());
                Tbl_product_bahanbaku_.qty=Number(qty);
           
                try{
                    await this.BahanrusakService.create(Tbl_product_bahanbaku_)
                }catch(e){
             
                }

            }
        }
    }

}
