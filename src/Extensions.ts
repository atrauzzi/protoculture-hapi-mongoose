import { ServiceProvider } from "protoculture";
import { hapiSymbols } from "protoculture-hapi";
import * as Hapi from "hapi";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        configureHapiMongooseCache(): void;
    }
}

// tslint:disable-next-line:only-arrow-functions
ServiceProvider.prototype.configureHapiMongooseCache = function () {

    // const options: Hapi.ServerOptions = this.bundle.container.get(hapiSymbols.ServerOptions);

    // options.cache = {
    //     engine: "mongoose",
    // };
};
