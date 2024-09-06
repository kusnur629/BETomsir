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
import { Tbl_user } from 'src/users/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Tbl_user[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Tbl_user> {
        return this.usersService.findById(id);
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

}
