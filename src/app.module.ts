import { HttpModule, HttpService } from '@nestjs/axios';
import { Inject, Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db-config/database.module';
import { Product } from './entities/produit.entity';
import { ProductModule, productProviders } from './Modules/product.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      })
    }),
    ProductModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...productProviders,

  ],
})
export class AppModule {

  path: string = 'https://rickandmortyapi.com/api/character/';
  constructor(
    private httpService: HttpService,
    @Inject('PRODUCT_REPOSITORY')
    private productRespository: Repository<Product>
  ) {
    console.log('init db');
    //this.loadDataAndAddFromApi();
  }

  private async loadDataAndAddFromApi() {
    const apiProduct = this.httpService.get(this.path).subscribe(x => {
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
          this.productRespository.save(p);
        }
      }

    })
  }

}
