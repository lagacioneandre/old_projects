import AbstractLinkShareButton from './AbstractLinkShareButton';
import EventHandler from './EventHandler';

export default class ShareButtonTwitter extends AbstractLinkShareButton {

    constructor(eventHandler: EventHandler, url: string, clazz: string) {
        super(eventHandler, url, clazz);
    }

    createLink(): string {
        return `https://twitter.com/share?url=${this.url}`;
    }

}