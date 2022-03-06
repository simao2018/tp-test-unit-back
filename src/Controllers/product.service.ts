import { Body, Controller, Delete, Get, Inject, Injectable, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/produit.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {

    }

    getProducts() {
        const productResponse = this.productRepository.find();
        return productResponse;
    }

    async getProduct(productId: string) {
        const response = await this.productRepository.findOneOrFail(productId);
        return response;
    }

    async createOrUpdate(product: Product) {
        const response = await this.productRepository.save(product);
    }

    async delete(productId: string) {
        const response = await this.productRepository.delete(productId);
        return response;
    }
}