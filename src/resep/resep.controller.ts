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
import { CreateResepDto } from './dto/create-resep.dto';
import { ResepService } from 'src/resep/resep.service';
import { Tbl_resep } from 'src/resep/resep.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { BahanbakuresepService } from 'src/resep/bahanbakuresep.service';
import { CreateBahanbakuresepDto } from 'src/resep/dto/create-bahanbakuresep.dto';
import { SatuanService } from 'src/satuan/satuan.service';
//
@Controller('api/resep')
export class ResepController {

    constructor(
        private readonly ResepService: ResepService,
        private readonly BahanbakuresepService: BahanbakuresepService,
        private readonly SatuanService: SatuanService,
        private readonly configService: ConfigService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_resep[]> {
        return this.ResepService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateResepDto: CreateResepDto, @Request() request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        var bahanbakuresep=null;
      

        bahanbakuresep = request_json["bahanbakuresep"];
        CreateResepDto.id = id;
        CreateResepDto.createdAt = new Date(Date.now());
        CreateResepDto.updatedAt = new Date(Date.now());

        
        if(CreateResepDto.hpp !==undefined){
            CreateResepDto.hpp =Number(CreateResepDto.hpp )
        }
        if(bahanbakuresep !==undefined){
            try{
                this.Bahanbaku_resep(id,bahanbakuresep)
            }catch(e){
    
            }
        }
       
        try {
    
            let data = await this.ResepService.create(CreateResepDto);

           
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
    async update(@Res() res, @Body() CreateResepDto: CreateResepDto, @Request() request) {
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
      
        CreateResepDto.updatedAt = new Date(Date.now());
       
        if(CreateResepDto.hpp !==undefined){
            CreateResepDto.hpp =Number(CreateResepDto.hpp )
        }
        try {
           
            let data = await this.ResepService.update(id,CreateResepDto);
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
        data = await this.ResepService.findfilter(startdate, enddate, name,page,limit,id,descending);
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
      
        data = await this.ResepService.findById(id);

        if(data !==null){

            let bahanbakuresep=[];

            try{
                bahanbakuresep= await this.BahanbakuresepService.findByIdResep(id)
            }catch(e){
                bahanbakuresep=[]
            }

            if(bahanbakuresep !==null){
                if(bahanbakuresep.length>0){

                    for(let i=0;i<bahanbakuresep.length;i++){
                        let idsatuan=null;
                        let datasatuan=null;
                      
                        try{
                            idsatuan=bahanbakuresep[i].id_satuan;
                        }catch(e){
                            idsatuan=null;
                        }
                        try{
                            datasatuan=await this.SatuanService.findById(idsatuan)
                        }catch(e){
                            datasatuan=null;
                        }
                        if(datasatuan!==null && datasatuan !==undefined){
                            let nameSatuan=null;
                            try{
                                nameSatuan=datasatuan.name;
                            }catch(e){
                                nameSatuan=null;
                            }
                            bahanbakuresep[i].nameSatuan=nameSatuan;

                        }

                    }

                }
            }
            data.bahanbakuresep=bahanbakuresep;
 
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
            data = await this.ResepService.findById(id);
        } catch (e) {
            data = null;
        }
        if (data && data !== null) {

            try {
                await this.ResepService.destroy(id);
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
    @Post('bahanbakuresep/create')
    async create2(@Res() res, @Body() CreateBahanbakuresepDto: CreateBahanbakuresepDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateBahanbakuresepDto.id = id;
        CreateBahanbakuresepDto.createdAt = new Date(Date.now());
        CreateBahanbakuresepDto.updatedAt = new Date(Date.now());
        if(CreateBahanbakuresepDto.qty !==undefined){
            CreateBahanbakuresepDto.qty=Number(CreateBahanbakuresepDto.qty)
        }
        if(CreateBahanbakuresepDto.harga !==undefined){
            CreateBahanbakuresepDto.harga=Number(CreateBahanbakuresepDto.harga)
        }
        try {
    
            let data = await this.BahanbakuresepService.create(CreateBahanbakuresepDto);
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
    @Post('bahanbakuresep/update')
    async update3(@Res() res, @Body() CreateBahanbakuresepDto: CreateBahanbakuresepDto, @Request() request) {
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
      
        CreateBahanbakuresepDto.updatedAt = new Date(Date.now());
        if(CreateBahanbakuresepDto.qty !==undefined){
            CreateBahanbakuresepDto.qty=Number(CreateBahanbakuresepDto.qty)
        }
        if(CreateBahanbakuresepDto.harga !==undefined){
            CreateBahanbakuresepDto.harga=Number(CreateBahanbakuresepDto.harga)
        }
        try {
           
            let data = await this.BahanbakuresepService.update(id,CreateBahanbakuresepDto);
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
    @Post('bahanbakuresep/detail')
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
        data = await this.BahanbakuresepService.findById(id)
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
    @Post('bahanbakuresep/delete/:id')
    async delete2(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.BahanbakuresepService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.BahanbakuresepService.destroy(id);
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

    async Bahanbaku_resep(idResep:string,tBahanbakuresep:any[]){
        if(tBahanbakuresep.length>0){
            for(let i=0;i<tBahanbakuresep.length;i++){
                let nameBahan=null;
                let qty=0;
                let harga=0;
                let idBahanbaku=null;
                let id_satuan=null;

                try{
                    nameBahan=tBahanbakuresep[i].nameBahan
                }catch(e){
                    nameBahan=null;
                }
                try{
                    qty=tBahanbakuresep[i].qty
                }catch(e){
                    qty=0;
                }
                try{
                    harga=tBahanbakuresep[i].harga
                }catch(e){
                    harga=0;
                }
                try{
                    idBahanbaku=tBahanbakuresep[i].idBahanbaku
                }catch(e){
                    idBahanbaku=null;
                }
                try{
                    id_satuan=tBahanbakuresep[i].id_satuan
                }catch(e){
                    id_satuan=null;
                }
                let Tbl_product_Resep_=new CreateBahanbakuresepDto()
                Tbl_product_Resep_.nameBahan=nameBahan;
                Tbl_product_Resep_.id_bahan_baku=idBahanbaku;
                Tbl_product_Resep_.id_resep=idResep;
                Tbl_product_Resep_.id_satuan=id_satuan;
                Tbl_product_Resep_.id=uuidv4();
                Tbl_product_Resep_.createdAt=new Date(Date.now());
                Tbl_product_Resep_.updatedAt=new Date(Date.now());
                Tbl_product_Resep_.qty=Number(qty);
                Tbl_product_Resep_.harga=Number(harga);
                try{
                    await this.BahanbakuresepService.create(Tbl_product_Resep_)
                }catch(e){
             
                }

            }
        }
    }

}
