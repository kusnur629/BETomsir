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
    ValidationPipe, BadRequestException, UseGuards, HttpStatus
} from '@nestjs/common';
import { CreateTypeorderDto } from './dto/create-typeorder.dto';
import { TypeorderService } from 'src/typeorder/typeorder.service';
import { ViewTypeorderService } from 'src/typeorder/viewtypeorder.service';
import { Viewtypeorder } from 'src/typeorder/viewtypeorder.entity';
import { Tbl_type_order } from 'src/typeorder/typeorder.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Controller('api/Typeorder')
export class TypeorderController {

    constructor(private readonly TypeorderService: TypeorderService,private readonly ViewTypeorderService: ViewTypeorderService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_type_order[]> {
        return this.TypeorderService.findAll();
    }

  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateTypeorderDto: CreateTypeorderDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateTypeorderDto.id = id;
        CreateTypeorderDto.createdAt = new Date(Date.now());
        CreateTypeorderDto.updatedAt = new Date(Date.now());
        if(CreateTypeorderDto.status !==undefined){
            CreateTypeorderDto.status=Number(CreateTypeorderDto.status);
        }
        try {
    
            let data = await this.TypeorderService.create(CreateTypeorderDto);
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
    async update(@Res() res, @Body() CreateTypeorderDto: CreateTypeorderDto, @Request() request) {
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
      
        CreateTypeorderDto.updatedAt = new Date(Date.now());
        if(CreateTypeorderDto.status !==undefined){
            CreateTypeorderDto.status=Number(CreateTypeorderDto.status);
        }
        try {
           
            let data = await this.TypeorderService.update(id,CreateTypeorderDto);
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
    @Post('delete/:id')
    async delete(@Param('id') id: string) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
        
            throw new BadRequestException(  'Param id is required');
        }
        var data = null;
       
        try {
            data = await this.TypeorderService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.TypeorderService.destroy(id);
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
        var name = null;
        var startdate = null;
        var enddate = null;
        var merchant_id = null;
        var data = null;
        var phone_number=null;
        var page=null;
        var limit=null;
        var descending=null;
        var nameMerchant=null;
        var email=null;
        var id=null;
        var response={};
        id = request_json["id"];
        name = request_json["name"];
        email = request_json["email"];
        phone_number = request_json["phone_number"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        page =Number (request_json["page"]);
        limit =Number (request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewTypeorderService.findfilter(startdate, enddate,merchant_id, name,nameMerchant,phone_number,email,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }

}
