import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Panier, PanierStatus } from "../entities/panier.entity";
import { PanierProduit } from "../entities/panier_produit.entity";

@Injectable()
export class PanierService {
    constructor(
        @InjectRepository(Panier)
        private panierRepository: Repository<Panier>,

        @InjectRepository(PanierProduit)
        private panierProduitRepository: Repository<PanierProduit>
    ) { }

    async getPanier(panierId: string): Promise<Panier> {
        const response = await this.panierRepository.findOne(panierId, { relations: ['panierProducts'] });
        return response;
    }
    getPanierActif(withRelation: boolean = true) {

        let relations: string[] = ['panierProducts'];
        if (withRelation)
            relations = ['panierProducts', 'panierProducts.panier', 'panierProducts.product'];

        const response = this.panierRepository.findOne(null, { where: { statut: PanierStatus.ACTIF }, relations: relations });
        return response;
    }

    async createOrUpdate(panier: Panier) {
        let response = new Panier();

        const getPanierActif = await this.getPanierActif(false);
        if (getPanierActif) {
            response = getPanierActif;
            if (!response.panierProducts?.length)
                response.panierProducts = [];

            response.panierProducts.push(...panier.panierProducts);
        }
        else {
            response = panier;
        }

        /* if(response.panierProducts?.length && panier.panierProducts?.length){
            for(const item of panier.panierProducts){
                const itemFromResponse = panier.panierProducts.find(x => x.productId === item.productId);
                
            }
        } */

        response = await this.panierRepository.save(response);
        return response;
    }

    deleteItemFromCart(id: string) {
        return this.panierProduitRepository.delete(id);
    }
}