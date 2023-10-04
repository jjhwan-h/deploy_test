import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService, //
    ) {}

    @Mutation(() => String)
    login(
        @Args('email') email: string, //
        @Args('password') password: string,
        @Context() context: IContext,
    ): Promise<string> {
        return this.authService.login({
            email,
            password,
            context,
        });
    }

    @UseGuards(GqlAuthGuard('refresh'))
    @Mutation(() => String)
    //1.refreshToken인가
    //2.accessToken 재발급
    restoreAccessToken(@Context() context: IContext): string {
        return this.authService.restoreAccessToken({ user: context.req.user });
    }
}
