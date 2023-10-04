import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
    IUserServiceCreate,
    IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable({})
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>, //
    ) {}
    //type이 제대로 전달되었는지 확인하기위해 interface로 받는다.
    findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
        return this.usersRepository.findOne({
            where: { email },
        });
    }
    async create({
        email,
        password,
        age,
        name,
    }: IUserServiceCreate): Promise<User> {
        const user = await this.findOneByEmail({ email });
        if (user) {
            throw new ConflictException('이미 등록된 이메일입니다.');
        }
        //여기저기서 사용된다면 hashservice를 만들어 사용하는게 맞다.
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersRepository.save({
            email: email,
            password: hashedPassword,
            name: name,
            age: age,
        });
    }
}
