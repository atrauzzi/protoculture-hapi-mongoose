import * as Catbox from "catbox";
import * as Boom from "boom";


export class MongooseCache implements Catbox.ClientApi {

    public get(key: Catbox.CacheKey, callback: Catbox.CallBackWithResult<null | Catbox.CachedObject>): Catbox.CacheItem {

        throw new Error("Method not implemented.");
    }

    public start(callback: Catbox.CallBackNoResult): void {

        throw new Error("Method not implemented.");
    }

    public stop(): void {

        throw new Error("Method not implemented.");
    }

    public set(key: Catbox.CacheKey, value: any, ttl: number, callback: Catbox.CallBackNoResult): void {

        throw new Error("Method not implemented.");
    }

    public drop(key: Catbox.CacheKey, callback: Catbox.CallBackNoResult): void {

        throw new Error("Method not implemented.");
    }

    public isReady(): boolean {

        throw new Error("Method not implemented.");
    }

    public validateSegmentName(segment: string): Boom.BoomError {

        throw new Error("Method not implemented.");
    }
}
