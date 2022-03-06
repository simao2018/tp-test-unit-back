import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { Panier, PanierStatus } from "../entities/panier.entity";
import { PanierController } from "./panier.controller";
import { PanierService } from "./panier.service";



describe('PanierController', () => {
    let panierController: PanierController;
    const mockPanierService = {
        createOrUpdate: jest.fn(panier => {
            return {
                id: Date.now(),
                ...panier
            }
        }),
        getPanierActif: jest.fn((): Panier => {
            return {
                statut: PanierStatus.ACTIF
            }
        })
    };
    beforeEach(async () => {
        const panierModule: TestingModule = await Test.createTestingModule({
            controllers: [PanierController],
            providers: [PanierService]
        }).overrideProvider(PanierService).useValue(mockPanierService).compile();

        panierController = panierModule.get<PanierController>(PanierController);
    });

    it('should be define', () => {
        expect(panierController).toBeDefined();
    });

    it('should create active panier', () => {
        expect(panierController.createOrUpdate({
            statut: PanierStatus.ARCHIVED
        })).toEqual<Panier>({
            id: expect.any(Number),
            statut: PanierStatus.ARCHIVED,
        });

        expect(mockPanierService.createOrUpdate).toHaveBeenCalled();
    });

    it('should get the active panier', () => {
        expect(panierController.getPanierActif()).toEqual({
            statut: PanierStatus.ACTIF
        });
    })

});

/* describe('PanierController', () => {
    let panierController: PanierController;
    let panierService: PanierService

    beforeEach(() => {
        panierController = new PanierController(panierService);
    })

    describe('getPanierActif', () => {
        it('should return active cart', async () => {
            let result: Promise<Panier>;
            jest.spyOn(panierController, 'getPanierActif').mockImplementation(() => result);

            expect(await panierController.getPanierActif()).toBe(result);
        });
    });

}); */