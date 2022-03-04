import { Inject, Module } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { PanierController } from "../Controllers/panier.controller";
import { ProductController } from "../Controllers/product.controller";
import { DatabaseModule } from "../db-config/database.module";
import { Panier } from "../entities/panier.entity";
import { Product } from "../entities/produit.entity";

export const panierProviders = [
    {
        provide: 'PANIER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Panier),
        inject: ['DATABASE_CONNECTION'],
    }
];

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [PanierController],
    providers: [
        ...panierProviders
    ]
})
export class PanierModule {
}
