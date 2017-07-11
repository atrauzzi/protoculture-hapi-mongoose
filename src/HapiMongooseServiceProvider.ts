import { ServiceProvider } from "protoculture";
import "./Extensions";


export class HapiMongooseServiceProvider extends ServiceProvider {

    public async boot() {

        this.bindHapiMongooseCache();
    }
}
