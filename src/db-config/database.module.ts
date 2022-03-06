import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { getConnectionOptions } from "typeorm";
import { DatabaseService } from "./database.service";

@Module({
    imports: [
        /* TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
            inject: [ConfigService],
            imports: [ConfigModule]
        }) */
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