import * as mongoose from "mongoose";
import * as Catbox from "catbox";


export interface CacheItem {
    key: Catbox.CacheKey;
    value: any;
    createdAt: Date;
    expiresAt?: Date;
}

const cacheItemSchema = new mongoose.Schema({
    key: {
        segment: String,
        id: String,
    },
    value: mongoose.Schema.Types.Mixed,
    expiresAt: Date,
    createdAt: Date, // https://docs.mongodb.com/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time
});

cacheItemSchema.index({ expiresAt: 1 }, { expiresAfterSeconds: 0 });

export const CacheItemModel = mongoose.model<mongoose.Document & CacheItem>("CacheItem", cacheItemSchema);
