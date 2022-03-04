import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Panier } from "./panier.entity";
import { PanierProduit } from "./panier_produit.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity {
    @Column('varchar', { name: 'title', length: 255, nullable: false })
    title: string;

    @Column('int', { name: 'qte', nullable: false })
    qte?: number;

    @Column('double', { name: 'price', nullable: false })
    price?: number;

    @Column('varchar', { name: 'imageUrl', nullable: false })
    imageUrl?: string;

    @Column('varchar', { name: 'panierId', nullable: true })
    panierId?: string;
}