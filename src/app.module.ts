import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductCategory } from './apis/productsCategories/entities/productCategory.entity';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { FilesModule } from './apis/files/files.module';
@Module({
    imports: [
        AuthModule,
        BoardsModule, //
        FilesModule,
        ProductsModule,
        ProductsCategoriesModule,
        UsersModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            //각 모듈 context에 전달되기전 req,res 조작부분
            //context를 적어주지 않아도 default로 req는 각 module context로 전달되지만
            //res는 전달 되지않는다.
            //따라서 return에 res를 추가한다.

            // context: (req, res) => {
            //     return {
            //         req,
            //         res,
            //     };
            // },
            //중괄호와 리턴사이에 아무것도 없으면 생략하고 소괄호로 대체 가능.
            context: ({ req, res }) => ({ req, res }), // context: (req,res) => ({req,res})로 할경우 에러발생.
        }), //

        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
    // controllers: [AppController],
    // providers: [AppService], // 의존성주입 -> new AppController(AppService)
})
export class AppModule {}
