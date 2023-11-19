import AbstractLinkShareButton from './AbstractLinkShareButton';
import EventHandler from './EventHandler';

export default class ShareButtonLinkedin extends AbstractLinkShareButton {

    constructor(eventHandler: EventHandler, url: string, clazz: string) {
        super(eventHandler, url, clazz);
    }

    createLink(): string {
        return `http://www.linkedin.com/shareArticle?url=${this.url}`;
    }

}