import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitService {
    public loaderControle$: EventEmitter<boolean>;
    public toasterConfig$: EventEmitter<object>;
    public updateContactList$: EventEmitter<object>;
    public emitIdSubcategory$: EventEmitter<string>;
    public contactDetails$: EventEmitter<object>;
    public controlConfirmModal$: EventEmitter<object>;
    public confirmRemove$: EventEmitter<object>;
    public urlAcessada: string;

    constructor() {
        this.loaderControle$ = new EventEmitter();
        this.toasterConfig$ = new EventEmitter();
        this.updateContactList$ = new EventEmitter();
        this.emitIdSubcategory$ = new EventEmitter();
        this.contactDetails$ = new EventEmitter();
        this.controlConfirmModal$ = new EventEmitter();
        this.confirmRemove$ = new EventEmitter();
    }

    public loaderControle(contole: boolean) {
        this.loaderControle$.emit(contole);
    }

    public toasterConfig(config: object) {
        this.toasterConfig$.emit(config);
    }

    public updateContactList(contacts: Array<object>) {
        this.updateContactList$.emit(contacts);
    }

    public emitIdSubcategory(id: string) {
        this.emitIdSubcategory$.emit(id);
    }

    public contactDetails(details: object) {
        this.contactDetails$.emit(details);
    }

    public controlConfirmModal(config: object) {
        this.controlConfirmModal$.emit(config);
    }

    public confirmRemove(contact: object) {
        this.confirmRemove$.emit(contact);
    }

    public setUrlAcessada(url: string) {
        this.urlAcessada = url;
    }

    public getUrlAcessada() {
        return this.urlAcessada;
    }

}
