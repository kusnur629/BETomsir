// import {
//     Body,
//     Controller,
//     Get,
//     Param,
//     ParseIntPipe,
//     Post,
//     Req,
//     Request,
//     Res,
//     UsePipes,
//     ValidationPipe, BadRequestException, UseGuards, HttpStatus,
//     HttpCode,
//     UseInterceptors,
//     UploadedFile
// } from '@nestjs/common';
// import { CreateMerchantDto } from './dto/create-merchant.dto';
// import { MerchantService } from 'src/merchant/merchant.service';
// import { Tbl_merchant } from 'src/merchant/merchant.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { EngineService } from 'src/engine/engine.service';
// import { ConfigService } from '@nestjs/config';
// import * as fs from 'fs';
// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
// //
// @Controller('api/merchant')
// export class MerchantController {

//     constructor(
//         private readonly MerchantService: MerchantService,
//         private readonly EngineService: EngineService,
//         private readonly configService: ConfigService) { }

//     @UseGuards(JwtAuthGuard)
//     @Get()
//     findAll(): Promise<Tbl_merchant[]> {
//         return this.MerchantService.findAll();
//     }

//     @UseGuards(JwtAuthGuard)
//     @Post('create')
//     @HttpCode(HttpStatus.ACCEPTED)
//     @UseInterceptors(FileInterceptor('file'))
//     async create(@UploadedFile() file: Express.Multer.File, @Body() CreateMerchantDto_: CreateMerchantDto, @Request() request) {
//         var request_json = JSON.parse(JSON.stringify(request.body));
//         var id = uuidv4();
//         CreateMerchantDto_.id = id;
//         var pathlogoSlider = "merchant/" + id;
//         var extension = "jpg";

//         if (file != undefined) {
//             await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
//             // Bannercategory_.urlFIle = this.configService.get("BASE_URL") +"api/"+ pathlogoSlider + "/" + ObjectID.toString() + "." + extension;
//             CreateMerchantDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
//         }


//         CreateMerchantDto_.createdAt = new Date(Date.now());;
//         CreateMerchantDto_.updatedAt = new Date(Date.now());;

//         try {

//             let data = await this.MerchantService.create(CreateMerchantDto_);

//             var response = {
//                 "response_code": 202,
//                 "data": data,
//                 "messages": {
//                     info: ['Successfuly'],
//                 },
//             }
//             return response;
//         } catch (e) {
//             throw new BadRequestException('Failed create data ' + e,);
//         }


//     }

//     @UseGuards(JwtAuthGuard)
//     @Post('update')
//     @HttpCode(HttpStatus.ACCEPTED)
//     @UseInterceptors(FileInterceptor('file'))
//     async update(@UploadedFile() file: Express.Multer.File, @Body() CreateMerchantDto_: CreateMerchantDto, @Request() request) {
//         var request_json = JSON.parse(JSON.stringify(request.body));
//         var id = null;

//         if (request_json["id"] !== undefined) {
//             id = request_json["id"];
//         } else {
//             throw new BadRequestException('Param id is required');
//         }
     
//         var pathlogoSlider = "merchant/" + id;
//         var extension = "jpg";

//         if (file != undefined) {
//             await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
//             CreateMerchantDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
//         }
//         CreateMerchantDto_.updatedAt = new Date(Date.now());;

//         try {

//             let data = await this.MerchantService.create(CreateMerchantDto_);

//             var response = {
//                 "response_code": 202,
//                 "data": data,
//                 "messages": {
//                     info: ['Successfuly'],
//                 },
//             }
//             return response;
//         } catch (e) {
//             throw new BadRequestException('Failed create data ' + e,);
//         }


//     }

//     @UseGuards(JwtAuthGuard)
//     @Post('filter')
//     async findWhereCompany(@Req() request: Request) {
//         const messages = {
//             "info": ["Data successful"],
//         };
//         var request_json = JSON.parse(JSON.stringify(request.body));
//         var address = null;
//         var startdate = null;
//         var enddate = null;
//         var name = null;
//         var data = null;
//         var phone_number=null;
//         var page=null;
//         var limit=null;
//         var descending=null;
//         var id=null;
//         var response={};
//         id = request_json["id"];
//         address = request_json["address"];
//         startdate = request_json["startdate"];
//         enddate = request_json["enddate"];
//         name = request_json["name"];
//         phone_number = request_json["phone_number"];
//         page =Number (request_json["page"]);
//         limit =Number (request_json["limit"]);
//         descending = request_json["descending"];
//         data = await this.MerchantService.findfilter(startdate, enddate, name, address,phone_number,page,limit,id,descending);
//         response={
//             "data":data,
//             "page":page,
//             "limit":limit,
//             "messages":messages
//         }
//         return response;

//     }
//     @Get(':id')
//     @HttpCode(HttpStatus.OK)
//     async getPict(@Param('id') id: string, @Res() response) {
//         if (id == undefined || id == "") {
//             throw new BadRequestException('Param id is required');
//         }
//         console.log(id);

//         var extension = "jpg";
//         var pathlogoGallery = "merchant/" + id;
//         var pathFile = this.configService.get("PATH_UPLOAD") + pathlogoGallery + "/" + id + "." + extension;
//         //const readableStreamFavicon = fs.createReadStream(pathFile, 'utf8');
//         const readableStreamFavicon = fs.readFileSync(pathFile);
//         if (readableStreamFavicon != null) {
//             response.set("Content-Type", "image/jpeg");
//             response.send(readableStreamFavicon);
//         } else {
//             response.send(null);
//         }
//     }
//     @UseGuards(JwtAuthGuard)
//     @Post('delete/:id')
//     async delete(@Param('id') id: string) {
//         const messages = {
//             "info": ["The delete successful"],
//         };
//         if (id == undefined || id == "") {

//             throw new BadRequestException('Param id is required');
//         }
//         var data = null;

//         try {
//             data = await this.MerchantService.findById(id);
//         } catch (e) {
//             data = null;
//         }
//         if (data && data !== null) {

//             try {
//                 await this.MerchantService.destroy(id);
//             } catch (e) {
//                 throw new BadRequestException("Unabled to proceed");
//             }
//         }

//         var response = {
//             "response_code": 202,
//             "messages": messages
//         }
//         return response;

//     }



// }
