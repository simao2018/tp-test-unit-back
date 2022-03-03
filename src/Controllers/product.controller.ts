import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "../entities/produit.entity";

@Controller('products')
export class ProductController {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>
    ) {

    }

    @Get()
    async getProducts(): Promise<Product[]> {
        const productResponse = await this.productRepository.find();
        return productResponse;
    }

    @Get('/:id')
    async getProduct(@Param() productId: string) {
        const response = await this.productRepository.findOneOrFail(productId);
        return response;
    }

    @Post()
    async createOrUpdate(@Body() product: Product) {
        const response = await this.productRepository.save(product);
    }

    @Delete()
    async delete(@Param() productId: string) {
        const response = await this.productRepository.delete(productId);
    }
}