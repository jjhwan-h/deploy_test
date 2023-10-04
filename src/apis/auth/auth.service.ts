import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
    IAuthServiceRestoreAccessToken,
    IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, //
        private readonly jwtService: JwtService,
    ) {}
    async login({
        email,
        password,
        context,
    }: IAuthServiceLogin): Promise<string> {
        //1. 이메일이 일치하는 유저를 DB에서  찾기
        const user = await this.usersService.findOneByEmail({ email });
        //2. 일치하는 유저가 없을 경우
        if (!user)
            throw new UnprocessableEntityException(
                '존재하지 않는 이메일입니다.',
            );
        console.log(password, user.password);
        const isAuth = await bcrypt.compare(password, user.password);
        //3. 일치하는 유저의 비밀번호가 틀렸을경우
        if (!isAuth)
            throw new UnprocessableEntityException('암호가 틀렸습니다.');

        //4. refreshToken(=JWT)를 만들어서 쿠키에저장하여 frontend브라우저에 보내주기
        this.setRefreshToken({ user, context });

        //5. 일치하는 유저의 비밀번호가 맞았을경우 (로그인성공)
        //JWT토큰을 만들어서 브라우저에 전달
        //토큰에는 많은정보를 안넣는게 좋다.
        return this.getAccessToken({ user });
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user });
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            //sub -> subject,  토큰을 생성할 때 지정하는 주체
            //각 주체마다 고유한 토큰을 생성.
            { sub: user.id },
            { secret: '나의비밀번호', expiresIn: '1h' },
        );
    }

    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            /*2주가 지나면 다시로그인. 무제한으로 사용하고싶을 경우 토큰 restore요청이
           들어왔을때 accesstoken과 refreshtoken을 같이 재발급한다.*/
            //실제로는 secret은 .env로 빼야한다.
            { secret: '나의리프레시비밀번호', expiresIn: '2w' },
        );

        //개발환경
        context.res.setHeader(
            'set-Cookie',
            `refreshToken=${refreshToken};path=/;`,
        );

        //배포환경(https)
        //domain에 [.주소] 를 추가하여 해당주소만 가능하도록
        //Secure https만 가능하도록
        //httpOnly 오직 백엔드를 통해서만 참조하고 js를 통해 참조가 불가능하도록
        // context.res.setHeader(
        //     'set-Cookie',
        //     `refreshToken=${refreshToken};path=/;
        //     domain=.mybacksite.com;
        //     SameSite=None;
        //     Secure;
        //     httpOnly
        //     `,
        // );

        // 누가사용가능한지 지정; 해당주소에서만 refreshToken을 주고받을 수 있도록.
        // context.res.setHeader(
        //     'Access-Contorl-Allow-Origin',
        //     'https://myfrontsite.com',
        // );
    }
}
