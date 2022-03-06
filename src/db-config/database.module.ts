import { Injectable, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectConnection, TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { Connection, getConnectionOptions } from "typeorm";
import { PanierModule } from "../Modules/panier.module";
import { ProductModule } from "../Modules/product.module";


@Injectable()
export class DatabaseService {
    constructor(
        @InjectConnection() private readonly connection: Connection
    ) {

    }

    getDbHandle(): Connection {
        return this.connection;
    }
}

@Module({
    imports: [
        ProductModule,
        PanierModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'tp_test_unit',
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: true,
            keepConnectionAlive: true,
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})

export class DatabaseModule { }


