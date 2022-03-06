import { Inject, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanierController } from "../Controllers/panier.controller";
import { PanierService } from "../Controllers/panier.service";
import { Panier } from "../entities/panier.entity";
import { PanierProduit } from "../entities/panier_produit.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Panier,
            PanierProduit,
        ])
    ],
    controllers: [PanierController],
    providers: [PanierService],
    exports: [
        PanierService,
    ]
})
export class PanierModule {
}
