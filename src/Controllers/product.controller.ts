import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "../entities/produit.entity";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {

    }

    @Get()
    getProducts() {
        return this.productService.getProducts();
    }

    @Get('/:id')
    async getProduct(@Param() productId: string) {
        return await this.productService.getProduct(productId);
    }

    @Post()
    async createOrUpdate(@Body() product: Product) {
        await this.productService.createOrUpdate(product);
    }

    @Delete('/:id')
    async delete(@Param() productId: string) {
        return await this.productService.delete(productId);
    }
}