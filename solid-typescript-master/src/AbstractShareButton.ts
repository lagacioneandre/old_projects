import EventHandler from './EventHandler';

export default abstract class AbstractShareButton {

    eventHandler: EventHandler;
    clazz: string;

    constructor(eventHandler: EventHandler, clazz: string) {
        this.eventHandler = eventHandler;
        this.clazz = clazz;
    }

    abstract createAction();

    bind() {
        const action = this.createAction();
        this.eventHandler.addEventListenerToClass(this.clazz, 'click', action);
    }

}