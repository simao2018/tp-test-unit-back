import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PanierModule } from '../src/Modules/panier.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Panier } from '../src/entities/panier.entity';
import { PanierProduit } from '../src/entities/panier_produit.entity';
import { Product } from '../src/entities/produit.entity';
import { ProductController } from '../src/Controllers/product.controller';
import { ProductService } from '../src/Controllers/product.service';

describe('ProductController (e2e)', () => {
    let app: INestApplication;

    const mockProduct: Product[] = [{ id: 'e1d', title: 'test', imageUrl: 'test', price: 200, qte: 10 }];

    const mockProduitRepository = {
        find: jest.fn().mockResolvedValue(mockProduct),
        save: jest.fn().mockResolvedValue(produit => {
            return {
                id: 'edf23',
                ...produit
            }
        }),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            imports: [Product],
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProduitRepository
                },
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should be define', () => {
        expect(app).toBeDefined();
    });

    it('/products (GET)', () => {
        return request(app.getHttpServer())
            .get('/products')
            .expect(200).expect(mockProduct);
    });

    it('/products (POST)', () => {
        return request(app.getHttpServer())
            .post('/products')
            .send({ title: 'hello' })
            //  .expect('Content-Type', /json/)
            .expect(201)
    });
});
