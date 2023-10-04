import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType, OmitType } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';

@InputType()
export class ProductTagInput extends OmitType(
    ProductTag,
    ['products'],
    InputType,
) {}
