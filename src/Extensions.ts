import * as Hapi from "hapi";
import * as inversify from "inversify";
import { ServiceProvider as ServiceProvider } from "protoculture";
import { hapiSymbols } from "protoculture-hapi";
import { MongooseCache } from "./MongooseCache";
import { CacheItemModel } from "./CacheItemModel";
import { hapiMongooseSymbols } from "./index";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        bindHapiMongooseCache(): void;
    }
}

ServiceProvider.prototype.bindHapiMongooseCache = function (name = "mongoose", partition?) {

    this.makeInjectable(MongooseCache);
    this.bindConstructor(hapiMongooseSymbols.HapiMongooseCache, MongooseCache);

    this.bundle.container
        .bind(hapiSymbols.Cache)
        .toFactory((context: inversify.interfaces.Context) => {

            const engine = context.container
                .get<MongooseCache>(hapiMongooseSymbols.HapiMongooseCache);

            const configuration: Hapi.CatboxServerCacheConfiguration = {
                name,
                engine,
                shared: true,
            };

            if (partition) {

                configuration.partition = partition;
            }

            return configuration;
        });
};
