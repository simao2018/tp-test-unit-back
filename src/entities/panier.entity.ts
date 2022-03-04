import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PanierProduit } from "./panier_produit.entity";
import { Product } from "./produit.entity";

export enum PanierStatus {
    ARCHIVED = 'archivé',
    ACTIF = 'actif'
}
@Entity({ name: 'panier' })
export class Panier extends BaseEntity {
    @OneToMany(() => PanierProduit, panierProduct => panierProduct.panier, { cascade: true })
    panierProducts?: PanierProduit[];

    @Column('enum', { name: 'statut', enum: PanierStatus, default: PanierStatus.ARCHIVED })
    statut?: PanierStatus;
}