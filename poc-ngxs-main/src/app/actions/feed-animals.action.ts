export class FeedAnimals {
    static readonly type = '[Zoo] FeedAnimals';
    constructor (public animalsToFeed: string) {}
}