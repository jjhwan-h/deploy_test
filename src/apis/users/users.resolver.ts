import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from 'src/apis/auth/guards/gql-auth.guard';
@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService, //
    ) {}

    //graphql return type 명시
    @Mutation(() => User)
    createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        //number로 받을경우 소수점으로 받기때문에 int타입임을 명시.
        @Args({ name: 'age', type: () => Int }) age: number,
    ): Promise<User> {
        return this.usersService.create({
            email,
            password,
            age,
            name,
        });
    }

    //graphql의 요청과 rest-api요청은 다르기때문에 graph -> rest 방식으로 바꿔줄 필요가 있다.
    //api요청이 들어오면 내가 만든 Guards를 실행하고, 통과하면 밑의 fetchUser를 실행
    @UseGuards(GqlAuthGuard('access'))
    @Query(() => String)
    fetchUser(
        //graqhql에서 req, res를 받아올수 있는 인자 Context
        @Context() context: IContext, //
    ): string {
        //유저정보 꺼내오기
        console.log(context.req.user);
        //임시로 메세지만 리턴
        return '인가에 성공하였습니다.';
    }
}
