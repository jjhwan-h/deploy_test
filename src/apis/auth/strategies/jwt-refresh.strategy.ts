import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import {KakaoStrategy} from 'passport-kakao'
//import {NaverStrategy} from 'passport-naver'
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        //1.비밀번호 검증, 2. 만료시간검증
        //PassportStrategy에서 검증읋 한다.
        super({
            jwtFromRequest: (req) => {
                console.log(req);
                const cookie = req.headers.cookie; // refreshToken=asjlkafsdjfldska...
                const refreshToken = cookie.replace('refreshToken= ', '');
                return refreshToken; //jwtFromRequest에 매핑되는 값
            },
            secretOrKey: '나의리프레시비밀번호', //password
        });
    }

    //성공 시
    //payload에는 token에 넣어둔 userid가 들어오게된다.
    //반드시 validate라는 이름의 함수실행
    validate(payload) {
        console.log(payload); // auth.service.ts에서 생성한 {sub: 유저아이디, ...}
        return {
            //req안에 user라는 키가 만들어지고 담기게 된다.
            //req.user={
            //    id:payload.sub
            //}
            id: payload.sub,
        };
    }
}
