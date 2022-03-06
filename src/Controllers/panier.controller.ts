import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { Repository } from "typeorm";
import { Panier, PanierStatus } from "../entities/panier.entity";
import { PanierService } from "./panier.service";

@Controller('panier')
export class PanierController {

    constructor(
        private panierService: PanierService
    ) { }

    @Get('/:id')
    getPanier(@Param() panierId: string) {
        return this.panierService.getPanier(panierId);
    }

    @Get()
    getPanierActif() {
        return this.panierService.getPanierActif();
    }

    @Post()
    createOrUpdate(@Body() panier: Panier) {
        return this.panierService.createOrUpdate(panier);
    }

    @Delete()
    async deleteItemFromCart(@Query('id') id: string) {
        console.log("🚀 ~ deleteItemFromCart ~ id", id)
        return this.panierService.deleteItemFromCart(id);
    }

}