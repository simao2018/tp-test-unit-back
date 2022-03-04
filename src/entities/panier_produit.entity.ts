import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Panier } from "./panier.entity";
import { Product } from "./produit.entity";

@Entity({ name: 'panier_produit' })
export class PanierProduit extends BaseEntity {
    @Column('int', { name: 'qte', nullable: true })
    qte?: number;

    @Column('varchar', { name: 'productId', nullable: true })
    productId?: string;

    @Column('varchar', { name: 'panierId', nullable: true })
    panierId?: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product?: Product;

    @ManyToOne(() => Panier, panier => panier.panierProducts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'panierId' })
    panier?: Panier;
}