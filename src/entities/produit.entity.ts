import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Panier } from "./panier.entity";

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

    @ManyToOne(() => Panier, panier => panier.produits, { onDelete: 'CASCADE' })
    panier?: Panier;
}