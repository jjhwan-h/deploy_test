import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column() //@Column(varchar(100))
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    email: string;

    //password를 프론트와 주고받는다? 있어서는 안된다..
    // @Field(() => String)
    @Column()
    password: string;

    @Column()
    @Field(() => Int)
    age: number;
}
