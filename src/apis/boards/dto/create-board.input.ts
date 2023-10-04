import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateBoardInput {
    @Field(() => String, { nullable: true })
    writer?: string;
    @Field(() => String)
    title: string;
    @Field(() => String)
    contents: string;
}
