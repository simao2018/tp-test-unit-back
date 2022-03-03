import { Inject, Module } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { ProductController } from "../Controllers/product.controller";
import { DatabaseModule } from "../db-config/database.module";
import { Product } from "../entities/produit.entity";

export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Product),
        inject: ['DATABASE_CONNECTION'],
    }
];

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [ProductController],
    providers: [
        ...productProviders
    ]
})
export class ProductModule {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>
    ) {
        // this.initData();
    }

    private async initData() {
        const productResponse = await this.productRepository.find();
        if (!productResponse.length) {
            const data: Product[] = [
                {
                    title: 'test',
                    imageUrl: 'testim',
                    price: 200,
                    qte: 3,
                },
                {
                    title: 'test2',
                    imageUrl: 'testim',
                    price: 200,
                    qte: 3,
                },
                {
                    title: 'test3',
                    imageUrl: 'testim',
                    price: 200,
                    qte: 3,
                },
                {
                    title: 'test4',
                    imageUrl: 'testim',
                    price: 200,
                    qte: 3,
                }
            ];

            const productAdd: Product[] = await this.productRepository.save(data);
            console.log("🚀 ~ initData ~ productAdd", productAdd)
        }
    }
}
