import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AnimalService {
    feed(animalToFeed: string): Observable<string> {
        console.log('AnimalService')
        return of(animalToFeed);
    }
}