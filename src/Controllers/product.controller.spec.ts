import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { DatabaseModule } from "../db-config/database.module";
import { databaseProviders } from "../db-config/database.provider";
import { Product } from "../entities/produit.entity";
import { ProductModule } from "../Modules/product.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


describe('ProductService', () => {
    let productController: ProductController;

    const mockUsersService = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).overrideProvider(ProductService).useValue(mockUsersService).compile();

        productController = module.get<ProductController>(ProductController);
    });

    it('ProductService - should be defined', () => {
        expect(productController).toBeDefined();
    });

    /* describe('getProduct', () => {
        it('Should get product with define id', async () => {
            const expectProduct: Product = {
                id: '0c3cf58d-2257-49c8-bbe9-f9e768abae4e',
                title: 'Alan Rails',
                qte: 1,
                price: 490,
                imageUrl: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
            };

            const product: Product = await productController.getProduct('0c3cf58d-2257-49c8-bbe9-f9e768abae4e');

            expect(product).toEqual(expectProduct);

        });
    }); */
});