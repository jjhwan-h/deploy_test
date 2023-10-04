import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import {KakaoStrategy} from 'passport-kakao'
//import {NaverStrategy} from 'passport-naver'
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        //1.비밀번호 검증, 2. 만료시간검증
        //PassportStrategy에서 검증읋 한다.
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: (req)=>{
            //     const temp = req.headers.Authorization //Bearer asdjlsjdflkjl...
            //     const accessToken = temp.toLowercase().replace("bearer ","")
            //     return accessToken //jwtFromRequest에 매핑되는 값
            // }, //accessToken
            secretOrKey: '나의비밀번호', //password
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
