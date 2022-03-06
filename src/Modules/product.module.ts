import { Inject, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "../Controllers/product.controller";
import { ProductService } from "../Controllers/product.service";
import { Product } from "../entities/produit.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
