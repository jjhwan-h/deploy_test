import { Float, Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSalesLocation {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    addressDetail: string;

    @Column({ type: 'decimal', precision: 9, scale: 6 }) //총 9자리 중 소수점이 6자리
    @Field(() => Float)
    lat: number;

    @Column({ type: 'decimal', precision: 9, scale: 6 }) //총 9자리 중 소수점이 6자리
    @Field(() => Float)
    lng: number;

    @Column()
    @Field(() => Date)
    meetingTime: Date;
}
