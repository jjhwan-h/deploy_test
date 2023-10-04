import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
    imports: [
        // TypeOrmModule.forFeature([
        //     User, //
        // ]),
        UsersModule,
        JwtModule.register({}),
    ],
    providers: [
        AuthResolver, //
        AuthService,
        // UsersService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
