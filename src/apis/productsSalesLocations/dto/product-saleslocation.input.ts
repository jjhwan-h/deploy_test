import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productSalesLocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
    ProductSalesLocation,
    ['id'],
    InputType,
) {
    //id를 빼고 Inputtype으로 변경
}
