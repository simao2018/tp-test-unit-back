import { Test } from "@nestjs/testing";
import { Connection, Repository } from "typeorm";
import { AppModule } from "../../src/app.module";
import { Panier, PanierStatus } from "../../src/entities/panier.entity";
import * as request from 'supertest'
import { INestApplication } from "@nestjs/common";
import { DatabaseService } from "../../src/db-config/database.module";

const panier = (): Panier => {
    return {
        statut: PanierStatus.ACTIF
    }
};

describe('PanierController', () => {
    let dbConnection: Connection;
    let httpServer: any;
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
        httpServer = app.getHttpServer();
    })

    afterAll(async () => {
        await app.close();
    });

    describe('getPanierActif', () => {

        it('should return an array of paniers', async () => {
            await dbConnection.query('SELECT * FROM panier');
            const response = await request(httpServer).get('/panier');

            expect(response.status).toBe(200);
        });
    });
});