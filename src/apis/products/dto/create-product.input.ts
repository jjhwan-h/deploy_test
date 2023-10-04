import { InputType, Field, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSalesLocations/dto/product-saleslocation.input';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { ProductTagInput } from './product-tag.input';

@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string;
    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    //
    @Field(() => ProductSaleslocationInput)
    productSalesLocation: ProductSaleslocationInput;

    //
    @Field(() => String)
    productCategoryId: string;

    //
    @Field(() => [ProductTagInput])
    productTags: ProductTagInput[];
}
