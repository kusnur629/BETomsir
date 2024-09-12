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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from 'src/customer/customer.service';
import { ViewCustomerService } from 'src/customer/viewcustomer.service';
import { Viewcustomer } from 'src/customer/viewcustomer.entity';
import { Tbl_customer } from 'src/customer/customer.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Controller('api/Customer')
export class CustomerController {

    constructor(private readonly CustomerService: CustomerService,private readonly ViewCustomerService: ViewCustomerService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_customer[]> {
        return this.CustomerService.findAll();
    }

  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateCustomerDto: CreateCustomerDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateCustomerDto.id = id;
        CreateCustomerDto.createdAt = new Date(Date.now());
        CreateCustomerDto.updatedAt = new Date(Date.now());
        try {
    
            let data = await this.CustomerService.create(CreateCustomerDto);
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
    async update(@Res() res, @Body() CreateCustomerDto: CreateCustomerDto, @Request() request) {
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
      
        CreateCustomerDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.CustomerService.update(id,CreateCustomerDto);
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
            data = await this.CustomerService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.CustomerService.destroy(id);
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
        data = await this.ViewCustomerService.findfilter(startdate, enddate,merchant_id, name,nameMerchant,phone_number,email,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }

}
