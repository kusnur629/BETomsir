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
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from 'src/category/category.service';
import { ViewcategoryService } from 'src/category/viewcategory.service';
import { Viewcategory } from 'src/category/viewcategory.entity';
import { Tbl_category } from 'src/category/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Controller('api/category')
export class CategoryController {

    constructor(private readonly CategoryService: CategoryService,private readonly ViewcategoryService: ViewcategoryService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_category[]> {
        return this.CategoryService.findAll();
    }

  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Res() res, @Body() CreateCategoryDto: CreateCategoryDto, @Request() req) {
        const messages = {
            "info": ["The create successful"],
        };

        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = uuidv4();
        CreateCategoryDto.id = id;
        CreateCategoryDto.createdAt = new Date(Date.now());
        CreateCategoryDto.updatedAt = new Date(Date.now());
        try {
    
            let data = await this.CategoryService.create(CreateCategoryDto);
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
    async update(@Res() res, @Body() CreateCategoryDto: CreateCategoryDto, @Request() request) {
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
      
        CreateCategoryDto.updatedAt = new Date(Date.now());
        try {
           
            let data = await this.CategoryService.update(id,CreateCategoryDto);
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
            data = await this.CategoryService.findById(id);
        } catch (e) {
            data= null;
        }
        if (data && data !== null) {
           
            try {
                await this.CategoryService.destroy(id);
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
        var createdByName=null;
        var page=null;
        var limit=null;
        var descending=null;
        var nameMerchant=null;
        
        var id=null;
        var response={};
        id = request_json["id"];
        name = request_json["name"];
        createdByName = request_json["createdByName"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        page =Number (request_json["page"]);
        limit =Number (request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewcategoryService.findfilter(startdate, enddate,merchant_id, name,nameMerchant,createdByName,page,limit,id,descending);
        response={
            "data":data,
            "page":page,
            "limit":limit,
            "messages":messages
        }
        return response;

    }

}
