import * as _ from "lodash";
import * as Catbox from "catbox";
import * as Boom from "boom";
import { CacheItemModel, CacheItem } from "./CacheItemModel";
import * as moment from "moment";
import * as mongoose from "mongoose";


export class MongooseCache implements Catbox.ClientApi {

    public get(key: Catbox.CacheKey, callback?: Catbox.CallBackWithResult<null | Catbox.CachedObject>): Catbox.CacheItem {

        this.getAsync(key)
            .then((envelope) => callback(null, envelope))
            .catch((error) => callback(Boom.wrap(error), null));

        return callback;
    }

    public set(key: Catbox.CacheKey, value: any, ttl: number, callback: Catbox.CallBackNoResult) {

        this.setAsync(key, value, ttl)
            .then(() => callback(null))
            .catch((error: Error) => callback(Boom.wrap(error)));

        return callback;
    }

    public drop(key: Catbox.CacheKey, callback: Catbox.CallBackNoResult) {

        this.dropAsync(key)
            .then(() => callback())
            .catch((error: Error) => callback(Boom.wrap(error)));

        return callback;
    }

    public isReady(): boolean {

        return mongoose.connection.readyState === 1;
    }

    public validateSegmentName(segment: string): Boom.BoomError {

        // I really can't imagine there's such a thing as a _bad segment name_ to this driver.
        return null;
    }

    public start(callback: Catbox.CallBackNoResult): void {

        // Hypothetically we'd do some kind of reference count if this ended up being important.
        callback();
    }

    public stop(): void {

        // Probably okay to noop as our mongoose connection is used by more than just the caching layer.
        // Hypothetically we'd do some kind of reference count if this ended up being important.
    }

    public async getAsync(key: Catbox.CacheKey): Promise<null | Catbox.CachedObject> {

        const cacheItem = await CacheItemModel
            .findOne({
                key,
            })
            .exec();

        if (_.isNull(cacheItem)) {

            return null;
        }

        return {
            item: cacheItem.value,
            stored: cacheItem.createdAt.getTime(),
            ttl: cacheItem.ttl,
        };
    }

    public async setAsync(key: Catbox.CacheKey, value: any, ttl?: number) {

        const now = moment().utc();
        const createdAt = now.clone().toDate();

        const cacheItem: CacheItem = {
            key,
            value,
            createdAt,
            ttl,
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
