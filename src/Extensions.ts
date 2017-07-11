import { ServiceProvider as ServiceProvider } from "protoculture";
import { hapiSymbols } from "protoculture-hapi";
import * as Hapi from "hapi";
import { MongooseCache } from "./MongooseCache";
import { CacheItemModel } from "./CacheItemModel";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        bindHapiMongooseCache(): void;
    }
}

ServiceProvider.prototype.bindHapiMongooseCache = function () {

    this.bundle.container
        .bind(hapiSymbols.Cache)
        .toConstructor(MongooseCache);
};
