import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_user } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Tbl_user)
        private readonly usersRepository: Repository<Tbl_user>,
    ) { }

    create(createUsersDto: CreateUsersDto) {
        const newUser = this.usersRepository.create(createUsersDto);
        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find();
    }
    findById(id: number) {
        return this.usersRepository.findOneBy({ id: id });
    }
    findByUsername(userName: string) {
        return this.usersRepository.findOneBy({ fullname: userName });
    }
    findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email: email });
    }
}