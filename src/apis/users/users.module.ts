import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';

@Module({
    imports: [
        //User table에 접근할 수 있는 레파지토리
        TypeOrmModule.forFeature([
            User, //
        ]),
    ],
    providers: [
        UsersResolver, //
        UsersService, //
    ],
    exports: [
        UsersService, //
    ],
})
export class UsersModule {}
