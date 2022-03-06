import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './Controllers/product.service';
import { DatabaseModule } from './db-config/database.module';
import { Product } from './entities/produit.entity';
import { PanierModule } from './Modules/panier.module';
import { ProductModule } from './Modules/product.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      })
    }),
    ProductModule,
    PanierModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tp_test_unit',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {

  path: string = 'https://rickandmortyapi.com/api/character/';
  constructor(
    private httpService: HttpService,
    private productService: ProductService
  ) {
    this.loadDataAndAddFromApi();
  }

  private async loadDataAndAddFromApi() {
    const productResponse = await this.productService.getProducts();
    if (productResponse?.length)
      return;
    this.httpService.get(this.path).subscribe(x => {
      console.log("🚀 ~ apiProduct ~ x", x.data.results);

      const products: Product[] = (x.data?.results as any[]).map(y => {
        return {
          title: y.name,
          imageUrl: y.image,
          price: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
          qte: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        }
      });

      if (products?.length) {
        for (const p of products) {
          this.productService.createOrUpdate(p);
        }
      }

    })
  }

}
