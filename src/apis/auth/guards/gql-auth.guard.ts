import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const GqlAuthGuard = (name) => {
    return class GqlAuthGuard extends AuthGuard(name) {
        // 쓰고자하는 인가 인자로 주기
        //AuthGuard안의 getRequest 오버라이딩
        // context -> 일반적으로 rest방식에서 사용하는 context
        getRequest(context: ExecutionContext) {
            //rest방식을 gql방식으로 변환하여 request를 리턴.
            const gqlContext = GqlExecutionContext.create(context);
            return gqlContext.getContext().req; // passportstrategy를 상속받은 클래스를 찾아 리턴
            //getRequest 메서드가 실행되기 이전에 PassportStrategy가 실행됩니다.

            //PassportStrategy 클래스는 Passport 라이브러리의 일부로서, f인증 전략을 정의하고 인증 과정을 관리하는 역할을 합니다. 인증 전략은 validate 메서드를 포함하는데, 이 메서드는 실제 인증 검증을 수행하고 사용자 정보를 반환합니다.

            //AuthGuard 또한 PassportStrategy를 기반으로 하며, 요청을 필터링하고 인증과 권한 검사를 수행하는 역할을 합니다. AuthGuard를 설정할 때 지정한 인증 전략 (GqlAuthAccessGuard의 경우 AuthGuard('access'))에 따라 PassportStrategy의 validate 메서드가 호출되고, 해당 메서드에서 인증 검증 및 사용자 정보 추출이 이루어집니다
        }
    };
};
