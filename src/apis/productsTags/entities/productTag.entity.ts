import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column() //@Column(varchar(100))
    @Field(() => String)
    name: string;

    @ManyToMany(() => Product, (products) => products.productTags)
    @Field(() => [Product])
    products: Product[];
}
