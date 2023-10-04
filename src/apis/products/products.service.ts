import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IProductsServiceCreate,
    IProductServiceFindOne,
    IProductServiceCheckSoldout,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productTags.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>, //

        private readonly productsSalesLocationService: ProductsSalesLocationsService,

        private readonly productsTagsService: ProductsTagsService,
    ) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['productSalesLocation', 'productCategory'],
        });
    }

    findOne({ productId }: IProductServiceFindOne): Promise<Product> {
        return this.productRepository.findOne({
            where: { id: productId },
            relations: ['productSalesLocation', 'productCategory'],
        });
    }
    async create({
        createProductInput,
    }: IProductsServiceCreate): Promise<Product> {
        //1.상품하나만 등록
        // const result = this.productRepository.save({
        //     // name: 'mouse',
        //     // description: 'good',
        //     // price: 9999,
        //     ...createProductInput,
        // });
        //2-1,상품과  상품거래위치를 같이 등록
        const {
            productSalesLocation,
            productCategoryId,
            productTags,
            ...rest
        } = createProductInput;

        // const result = await this.productsSalesLocationRepository.save({
        //     ...productSalesLocation,
        // });
        const result = await this.productsSalesLocationService.create({
            productSalesLocation,
        });

        //2-2상품 태크 등록
        //ex) productTags => ["#electric","#chungbuk","#1234"]
        const tagNames = productTags.map((el) => el.name.replace('#', ''));
        const prevTags = await this.productsTagsService.findByNames({
            tagNames,
        });
        const temp = [];
        tagNames.forEach((el) => {
            const isExists = prevTags.find((prevEl) => {
                el === prevEl.name;
            });
            if (!isExists) temp.push({ name: el });
        });

        const newTags = await this.productsTagsService.bulkInsert({
            names: temp,
        }); //bulk-insert
        const tags = [...prevTags, ...newTags.identifiers];
        console.log(tags);

        const result2 = await this.productRepository.save({
            ...rest,
            productSalesLocation: result,
            productCategory: {
                id: productCategoryId,
            },
            productTags: tags, //id's
        });
        return result2;
    }

    async update({
        productId,
        updateProductInput,
    }: IProductsServiceUpdate): Promise<Product> {
        const product = await this.findOne({ productId });
        this.checkSoldout({ product });

        const result = this.productRepository.save({
            //바뀌는것만 업데이트된다.
            // id:productId,
            // isSoldout: product.isSoldout,
            // name: product.name,
            // description: product.description,
            // price: product.price,

            // name: updateProductInput.name,
            // description:updateProductInput.description,
            // price: updateProductInput.price,
            ...product,
            ...updateProductInput,
        });
        return result;
    }

    checkSoldout({ product }: IProductServiceCheckSoldout) {
        if (product.isSoldout) {
            throw new UnprocessableEntityException('...');
        }

        // if(product.isSoldout){
        //     throw new HttpException("이미 판매완료된 상품입니다.",HttpStatus.UNPROCESSABLE_ENTITY)
        // }
    }

    async delete({ productId }: IProductServiceDelete): Promise<boolean> {
        //1, 진짜 삭제
        // const result = await this.productRepository.delete({ id: productId });
        // return result.affected ? true : false;
        //2. soft 삭제 - isDeleted
        //this.productRepository.update({ id: productId }, { isDeleted: true });
        //3. soft 삭제 근데 언제 삭제 되었는지 기록 - deletedAt
        //this.productRepository.update(
        //    { id: productId },
        //    { deletedAt: new Date() },
        //);
        //4. soft 삭제(softRemove) - typeorm이 제공
        //const result = this.productRepository.softRemove({ id: productId });
        //5. soft 삭제(softDelete) - typeorm이 제공
        const result = this.productRepository.softDelete({ id: productId });
        return (await result).affected ? true : false;
    }
}

interface IProductServiceDelete {
    productId: string;
}
