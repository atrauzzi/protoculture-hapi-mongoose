import { ServiceProvider } from "protoculture";
import { hapiSymbols } from "protoculture-hapi";
import { MongooseCache } from "./MongooseCache";


export class HapiMongooseServiceProvider extends ServiceProvider {

    public async boot() {

        this.bundle.container
            .bind(hapiSymbols.Cache)
            .to(MongooseCache);
    }
}
