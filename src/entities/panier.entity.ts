import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./produit.entity";

@Entity({ name: 'panier' })
export class Panier extends BaseEntity {
    @OneToMany(() => Product, products => products.panier, { cascade: true })
    produits?: Product[];
}