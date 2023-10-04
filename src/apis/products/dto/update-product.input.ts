import {
    PartialType,
    InputType,
    Field,
    Int,
    PickType,
    OmitType,
} from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';

// PickType(CreateProductInput, ['name', 'price']);
// OmitType(CreateProductInput, ['description']);
// PartialType(CreateProductInput);
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    //
    //name?: string
    //description?:string
    //price?:number
}

// @InputType()
// export class UpdateProductInput {
//     @Field(() => String, { nullable: true })
//     name: string;
//     @Field(() => String, { nullable: true })
//     description: string;

//     @Min(0)
//     @Field(() => Int, { nullable: true })
//     price: number;
// }
