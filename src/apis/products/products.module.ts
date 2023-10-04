import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSaleslocations.service';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSalesLocation.entity';
import { ProductsTagsService } from '../productsTags/productTags.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';

@Module({
    //controllers
    imports: [
        TypeOrmModule.forFeature([
            Product, //
            ProductSalesLocation,
            ProductTag,
        ]),
    ],
    providers: [
        ProductsResolver, //
        ProductsService,
        ProductsSalesLocationsService,
        ProductsTagsService,
    ],
})
export class ProductsModule {}
