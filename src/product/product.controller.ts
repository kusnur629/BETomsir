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
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Tbl_product } from 'src/product/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { EngineService } from 'src/engine/engine.service';
import { ConfigService } from '@nestjs/config';
import { ProductbarcodeService } from 'src/product/productbarcode.service';
import { CreateProductbarcodeDto } from 'src/product/dto/create-productbarcode.dto';
import { BahanbakuproductService } from 'src/product/bahanbakuproduct.service';
import { CreateBahanbakuproductDto } from 'src/product/dto/create-bahanbakuproduct.dto';
import { ResepproductService } from 'src/product/resepproduct.service';
import { CreateResepproductDto } from 'src/product/dto/create-resepproduct.dto';
import * as fs from 'fs';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { json } from 'sequelize';
//
@Controller('api/product')
export class ProductController {

    constructor(
        private readonly ProductService: ProductService,
        private readonly ProductbarcodeService: ProductbarcodeService,
        private readonly BahanbakuproductService: BahanbakuproductService,
        private readonly ResepproductService: ResepproductService,
        private readonly EngineService: EngineService,
        private readonly configService: ConfigService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_product[]> {
        return this.ProductService.findAll();
    }

   // @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() CreateProductDto_: CreateProductDto, @Request() request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var barcode=null;
        var formatbarcode=null;
        var tBarcode=[];
        var bahanbaku=null;
        var formatbahanbaku=null;
        var tBahanbaku=[];
        var resep=null;
        var formatresep=null;
        var tResep=[];
        barcode = request_json["barcode"];
        bahanbaku = request_json["bahanbaku"];
        resep = request_json["resep"];
        var id = uuidv4();
        CreateProductDto_.id = id;
        var pathlogoSlider = "product/" + id;
        var extension = "jpg";

        if(barcode !==undefined){
            formatbarcode= JSON.parse(JSON.stringify(barcode));
            tBarcode=JSON.parse(formatbarcode)
        }
        if(bahanbaku !==undefined){
            formatbahanbaku= JSON.parse(JSON.stringify(bahanbaku));
            tBahanbaku=JSON.parse(formatbahanbaku)
        }
        if(resep !==undefined){
            formatresep= JSON.parse(JSON.stringify(resep));
            tResep=JSON.parse(formatresep)
        }
        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            // Bannercategory_.urlFIle = this.configService.get("BASE_URL") +"api/"+ pathlogoSlider + "/" + ObjectID.toString() + "." + extension;
            CreateProductDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }

        if(CreateProductDto_.modal !==undefined){
            CreateProductDto_.modal=Number(CreateProductDto_.modal)
        }
        if(CreateProductDto_.price !==undefined){
            CreateProductDto_.price=Number(CreateProductDto_.price)
        }
        
        if(CreateProductDto_.is_stock_off !==undefined){
            CreateProductDto_.is_stock_off=Number(CreateProductDto_.is_stock_off)
        }
        CreateProductDto_.createdAt = new Date(Date.now());
        CreateProductDto_.updatedAt = new Date(Date.now());

        try{
            this.barcode(id,tBarcode)
        }catch(e){

        }
        try{
            this.bahanbaku(id,tBahanbaku)
        }catch(e){

        }
        try{
            this.resep(id,tResep)
        }catch(e){

        }
        try {

            let data = await this.ProductService.create(CreateProductDto_);

            var response = {
                "response_code": 202,
                "data": data,
                "messages": {
                    info: ['Successfuly'],
                },
            }
            return response;
        } catch (e) {
            throw new BadRequestException('Failed create data ' + e,);
        }


    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseInterceptors(FileInterceptor('file'))
    async update(@UploadedFile() file: Express.Multer.File, @Body() CreateProductDto_: CreateProductDto, @Request() request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = null;

        if (request_json["id"] !== undefined) {
            id = request_json["id"];
        } else {
            throw new BadRequestException('Param id is required');
        }
     
        var pathlogoSlider = "product/" + id;
        var extension = "jpg";

        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            CreateProductDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }
        if(CreateProductDto_.modal !==undefined){
            CreateProductDto_.modal=Number(CreateProductDto_.modal)
        }
        if(CreateProductDto_.price !==undefined){
            CreateProductDto_.price=Number(CreateProductDto_.price)
        }
        if(CreateProductDto_.is_stock_off !==undefined){
            CreateProductDto_.is_stock_off=Number(CreateProductDto_.is_stock_off)
        }
        CreateProductDto_.updatedAt = new Date(Date.now());;

        try {

            let data = await this.ProductService.create(CreateProductDto_);

            var response = {
                "response_code": 202,
                "data": data,
                "messages": {
                    info: ['Successfuly'],
                },
            }
            return response;
        } catch (e) {
            throw new BadRequestException('Failed create data ' + e,);
        }


    }

    @UseGuards(JwtAuthGuard)
    @Post('barcode/create')
    async create2(@Res() res, @Body() CreateProductbarcodeDto: CreateProductbarcodeDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateProductbarcodeDto.id = id;
        CreateProductbarcodeDto.createdAt = new Date(Date.now());
        CreateProductbarcodeDto.updatedAt = new Date(Date.now());
        try {
    
            let data = await this.ProductbarcodeService.create(CreateProductbarcodeDto);
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
    @Post('barcode/update')
    async update3(@Res() res, @Body() CreateProductbarcodeDto: CreateProductbarcodeDto, @Request() request) {
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
      
        CreateProductbarcodeDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.ProductbarcodeService.update(id,CreateProductbarcodeDto);
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
    @Post('barcode/detail')
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
        data = await this.ProductbarcodeService.findById(id)
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
    @Post('barcode/delete/:id')
    async delete2(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.ProductbarcodeService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.ProductbarcodeService.destroy(id);
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
    @Post('bahanbaku/create')
    async create3(@Res() res, @Body() CreateBahanbakuproductDto: CreateBahanbakuproductDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateBahanbakuproductDto.id = id;
        CreateBahanbakuproductDto.createdAt = new Date(Date.now());
        CreateBahanbakuproductDto.updatedAt = new Date(Date.now());
        try {
    
            let data = await this.BahanbakuproductService.create(CreateBahanbakuproductDto);
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
    @Post('bahanbaku/update')
    async update4(@Res() res, @Body() CreateBahanbakuproductDto: CreateBahanbakuproductDto, @Request() request) {
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
      
        CreateBahanbakuproductDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.BahanbakuproductService.update(id,CreateBahanbakuproductDto);
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
    @Post('bahanbaku/detail')
    async findWhereCompany55(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
       var data=null;
        var id=null;
        var response={};
        id = request_json["id"];
      
        try{
        data = await this.BahanbakuproductService.findById(id)
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
    @Post('bahanbaku/delete/:id')
    async delete2f(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.BahanbakuproductService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.BahanbakuproductService.destroy(id);
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
    @Post('resep/create')
    async create3t(@Res() res, @Body() CreateResepproductDto: CreateResepproductDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateResepproductDto.id = id;
        CreateResepproductDto.createdAt = new Date(Date.now());
        CreateResepproductDto.updatedAt = new Date(Date.now());
        try {
    
            let data = await this.ResepproductService.create(CreateResepproductDto);
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
    @Post('resep/update')
    async update45(@Res() res, @Body() CreateResepproductDto: CreateResepproductDto, @Request() request) {
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
      
        CreateResepproductDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.ResepproductService.update(id,CreateResepproductDto);
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
    @Post('resep/detail')
    async findWhereCompany554(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
       var data=null;
        var id=null;
        var response={};
        id = request_json["id"];
      
        try{
        data = await this.ResepproductService.findById(id)
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
    @Post('resep/delete/:id')
    async delete2ft(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.ResepproductService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.ResepproductService.destroy(id);
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
    @Post('filter')
    async findWhereCompany(@Req() request: Request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
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
        data = await this.ProductService.findfilter(startdate, enddate, name,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getPict(@Param('id') id: string, @Res() response) {
        if (id == undefined || id == "") {
            throw new BadRequestException('Param id is required');
        }
        console.log(id);

        var extension = "jpg";
        var pathlogoGallery = "product/" + id;
        var pathFile = this.configService.get("PATH_UPLOAD") + pathlogoGallery + "/" + id + "." + extension;
        //const readableStreamFavicon = fs.createReadStream(pathFile, 'utf8');
        const readableStreamFavicon = fs.readFileSync(pathFile);
        if (readableStreamFavicon != null) {
            response.set("Content-Type", "image/jpeg");
            response.send(readableStreamFavicon);
        } else {
            response.send(null);
        }
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
            data = await this.ProductService.findById(id);
        } catch (e) {
            data = null;
        }
        if (data && data !== null) {

            try {
                await this.ProductService.destroy(id);
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

   // @UseGuards(JwtAuthGuard)
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
      
        data = await this.ProductService.findById(id);

        if(data !==null){

            let barcode=[];

            try{
                barcode= await this.ProductbarcodeService.findbyproduct(id)
            }catch(e){
                barcode=[]
            }

            let bahanbaku=[];

            try{
                bahanbaku= await this.BahanbakuproductService.findbyproduct(id)
            }catch(e){
                bahanbaku=[]
            }
            let resep=[];

            try{
                resep= await this.ResepproductService.findbyproduct(id)
            }catch(e){
                resep=[]
            }

            data.barcode=barcode;
            data.bahanbaku=bahanbaku;
            data.resep=resep;
        }
        response={
            "data":data,
            "messages":messages
        }
        return response;

    }

    async barcode(idProduct:string,tBarcode:any[]){
        if(tBarcode.length>0){
            for(let i=0;i<tBarcode.length;i++){
                let barcode=null;

                try{
                    barcode=tBarcode[i]
                }catch(e){
                    barcode=null;
                }

                let Tbl_product_barcode_=new CreateProductbarcodeDto()
                Tbl_product_barcode_.barcode=barcode;
                Tbl_product_barcode_.product_id=idProduct;
                Tbl_product_barcode_.id=uuidv4();
                Tbl_product_barcode_.createdAt=new Date(Date.now());
                Tbl_product_barcode_.updatedAt=new Date(Date.now());

                try{
                    await this.ProductbarcodeService.create(Tbl_product_barcode_)
                }catch(e){
                 
                }

            }
        }
    }

    async bahanbaku(idProduct:string,tBahanbaku:any[]){
        if(tBahanbaku.length>0){
            for(let i=0;i<tBahanbaku.length;i++){
                let nameBahan=null;
                let jmlButuh=null;
                let harga=0;

                try{
                    nameBahan=tBahanbaku[i].nameBahan
                }catch(e){
                    nameBahan=null;
                }
                try{
                    jmlButuh=tBahanbaku[i].jmlButuh
                }catch(e){
                    jmlButuh=null;
                }
                try{
                    harga=tBahanbaku[i].harga
                }catch(e){
                    harga=0;
                }
                let Tbl_product_bahanbaku_=new CreateBahanbakuproductDto()
                Tbl_product_bahanbaku_.nameBahan=nameBahan;
                Tbl_product_bahanbaku_.product_id=idProduct;
                Tbl_product_bahanbaku_.id=uuidv4();
                Tbl_product_bahanbaku_.createdAt=new Date(Date.now());
                Tbl_product_bahanbaku_.updatedAt=new Date(Date.now());
                Tbl_product_bahanbaku_.harga=Number(harga);
                Tbl_product_bahanbaku_.jmlButuh=jmlButuh;
                try{
                    await this.BahanbakuproductService.create(Tbl_product_bahanbaku_)
                }catch(e){
             
                }

            }
        }
    }
    async resep(idProduct:string,tResep:any[]){
        if(tResep.length>0){
            for(let i=0;i<tResep.length;i++){
                let nameResep=null;
              

                try{
                    nameResep=tResep[i].nameResep
                }catch(e){
                    nameResep=null;
                }
                
               
                let Tbl_product_resep_=new CreateResepproductDto()
                Tbl_product_resep_.nameResep=nameResep;
                Tbl_product_resep_.product_id=idProduct;
                Tbl_product_resep_.id=uuidv4();
                Tbl_product_resep_.createdAt=new Date(Date.now());
                Tbl_product_resep_.updatedAt=new Date(Date.now());
             
                try{
                    await this.ResepproductService.create(Tbl_product_resep_)
                }catch(e){
             
                }

            }
        }
    }
}
