import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class MarkersService {

    constructor(
        private dataBase: AngularFireDatabase
    ) { }

    public getMarkers(): AngularFireList<any> {
        return this.dataBase.list('markers');
    }

    public addMarker(marker: object): any {
        return this.dataBase.list('markers').push(marker);
    }

    public removeMarker(markerId: string): any {
        const baseItems = this.getGenericaMarkersList();
        return baseItems.remove(markerId);
    }

    public editMarker(marker: object) {
        const baseItems = this.getGenericaMarkersList();
        return baseItems.update(marker['id'], marker);
    }

    private getGenericaMarkersList(): any {
        return this.dataBase.list('markers');
    }
}
