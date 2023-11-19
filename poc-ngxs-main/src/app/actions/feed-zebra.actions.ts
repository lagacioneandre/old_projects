import { ZebraFood } from "../states/zebra.state";

export class FeedZebra {
    static readonly type = '[Zoo] FeedZebra';
    constructor (public zebraToFeed: ZebraFood) {}
}