import { Int, Field, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    ManyToOne,
    OneToOne,
    JoinColumn,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Field(() => String)
    @Column() //@Column(varchar(100))
    name: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => Int)
    @Column()
    price: number;

    //처음상품 등록 시 판매여부 default값은 false
    @Field(() => Boolean)
    @Column({ default: false })
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    @Field(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation;

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[];

    @DeleteDateColumn() // softdelete, softremove
    deletedAt: Date;

    // @CreateDateColumn()

    // @UpdateDateColumn()
}
