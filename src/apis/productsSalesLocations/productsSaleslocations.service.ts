import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSalesLocationsService {
    constructor(
        @InjectRepository(ProductSalesLocation)
        private readonly productsSalesLocationsRepository: Repository<ProductSalesLocation>,
    ) {}
    create({ productSalesLocation }) {
        return this.productsSalesLocationsRepository.save({
            ...productSalesLocation,
        });
    }
}
