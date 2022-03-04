import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { Panier, PanierStatus } from "../entities/panier.entity";

@Controller('panier')
export class PanierController {

    constructor(
        @Inject('PANIER_REPOSITORY')
        private panierRepository: Repository<Panier>
    ) { }

    @Get('/:id')
    async getPanier(@Param() panierId: string): Promise<Panier> {
        const response = await this.panierRepository.findOne(panierId, { relations: ['panierProducts'] });
        console.log("🚀 ~ getPanier ~ response", response)
        return response;
    }

    @Get()
    async getPanierActif(): Promise<Panier> {
        const response = await this.panierRepository.findOne(null, { where: { statut: PanierStatus.ACTIF }, relations: ['panierProducts', 'panierProducts.product', 'panierProducts.panier'] });
        console.log("🚀 ~ response", response)
        return response;
    }

    @Post()
    async createOrUpdate(@Body() panier: Panier) {
        console.log("🚀 ~ param panier", panier)
        let response = new Panier();
        try {
            const getPanierActif = await this.getPanierActif();
            if (getPanierActif)
                response = getPanierActif;
            else
                response = panier;

            console.log("🚀 response before save", response)


            response = await this.panierRepository.save(panier);
            console.log("🚀 ~ createOrUpdate ~ response", response)
        } catch (e) {
            console.log("🚀 ~ createOrUpdate ~ e", e)
        }
        return response;
    }
}