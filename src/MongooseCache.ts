import * as Catbox from "catbox";
import * as Boom from "boom";
import { CacheItemModel, CacheItem } from "./CacheItemModel";
import * as moment from "moment";
import * as mongoose from "mongoose";


export class MongooseCache implements Catbox.ClientApi {

    public get(key: Catbox.CacheKey, callback?: Catbox.CallBackWithResult<null | Catbox.CachedObject>): Catbox.CacheItem {

        this.getAsync<Catbox.CacheItem>(key)
            .then((cacheItem) => callback(null, cacheItem))
            .catch((error) => callback(Boom.wrap(error), null));

        // todo: Supposedly this returns a "CacheItem", but I dunno how or when...
    }

    public set(key: Catbox.CacheKey, value: any, ttl: number, callback: Catbox.CallBackNoResult) {

        this.setAsync(key, value, ttl)
            .catch((error: Error) => callback(Boom.wrap(error)));
    }

    public drop(key: Catbox.CacheKey, callback: Catbox.CallBackNoResult) {

        this.dropAsync(key)
            .then(() => callback())
            .catch((error: Error) => callback(Boom.wrap(error)));
    }

    public isReady(): boolean {

        return mongoose.connection.readyState === 1;
    }

    public validateSegmentName(segment: string): Boom.BoomError {

        // I really can't imagine there's such a thing as a _bad segment name_ to this driver.
        return null;
    }

    public start(callback: Catbox.CallBackNoResult): void {

        // Probably okay to noop as our mongoose connection is used by more than just the caching layer.
        // Hypothetically we'd do some kind of reference count if this ended up being important.
    }

    public stop(): void {

        // Probably okay to noop as our mongoose connection is used by more than just the caching layer.
        // Hypothetically we'd do some kind of reference count if this ended up being important.
    }

    public async getAsync<CacheItemType>(key: Catbox.CacheKey): Promise<CacheItemType> {

        const cacheItem = await CacheItemModel
            .findOne({
                key,
            })
            .exec();

        return cacheItem.value as CacheItemType;
    }

    public async setAsync(key: Catbox.CacheKey, value: any, ttl?: number) {

        const now = moment().utc();
        const createdAt = now.clone().toDate();

        const cacheItem: CacheItem = {
            key,
            value,
            createdAt,
        };

        if (ttl) {

            cacheItem.expiresAt = now
                .clone()
                .add(ttl, "s")
                .toDate();
        }

        await new CacheItemModel(cacheItem)
            .save();
    }

    public async dropAsync(key: Catbox.CacheKey) {

        await CacheItemModel
            .remove({
                key,
            })
            .exec();
    }
}
