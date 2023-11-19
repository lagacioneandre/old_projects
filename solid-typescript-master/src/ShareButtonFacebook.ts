import AbstractLinkShareButton from './AbstractLinkShareButton';
import EventHandler from './EventHandler';

export default class ShareButtonFacebook extends AbstractLinkShareButton {

    constructor(eventHandler: EventHandler, url: string, clazz: string) {
        super(eventHandler, url, clazz);
    }

    createLink(): string {
        return `http://www.facebook.com/sharer.php?u=${this.url}`;
    }

}