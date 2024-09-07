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
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { ViewuserService } from 'src/users/viewuser.service';
import { Viewuser } from 'src/users/viewuser.entity';
import { Tbl_user } from 'src/users/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService,private readonly ViewuserService: ViewuserService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_user[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Viewuser> {
        return this.ViewuserService.findById(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateUsersDto: CreateUsersDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };



        try {
            const passwordInPlaintext = CreateUsersDto.password;
            const hash = await bcrypt.hash(passwordInPlaintext, 10);
            CreateUsersDto.password = hash;
            CreateUsersDto.createdAt = new Date(Date.now());
            CreateUsersDto.updatedAt = new Date(Date.now());
            let data = await this.usersService.create(CreateUsersDto);
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
    @Post('update')
    async update(@Res() res, @Body() CreateUsersDto: CreateUsersDto, @Request() request) {
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
            throw new BadRequestException("Unabled to proceed");
        }
        if(CreateUsersDto.password !==undefined){
            const passwordInPlaintext = CreateUsersDto.password;
            const hash = await bcrypt.hash(passwordInPlaintext, 10);
            CreateUsersDto.password = hash;
        }
       
        CreateUsersDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.usersService.update(id,CreateUsersDto);
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
            data = await this.usersService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.usersService.destroy(id);
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
        var fullname = null;
        var startdate = null;
        var enddate = null;
        var merchant_id = null;
        var data = null;
        var email=null;
        var role=null;
        var page=null;
        var limit=null;
        var descending=null;
        var nameMerchant=null;
        var id=null;
        var response={};
        id = request_json["id"];
        fullname = request_json["fullname"];
        email = request_json["email"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        role = request_json["role"];
        page =Number (request_json["page"]);
        limit =Number (request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewuserService.findfilter(startdate, enddate, merchant_id, fullname,email,role,page,limit,id,nameMerchant,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }

}
