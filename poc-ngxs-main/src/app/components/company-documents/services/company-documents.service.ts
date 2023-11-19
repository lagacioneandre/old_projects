import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { CompanyDocumentDTO } from "../models/company-document.dto";

@Injectable({
    providedIn: 'root'
})
export class CompanyDocumentsService {

    private mockCompanyDocumentDTO: CompanyDocumentDTO[] = [{
        id: '1',
        title: 'Documento 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isRequired: true,
        uploaded: false,
    }, {
        id: '2',
        title: 'Documento 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isRequired: false,
        uploaded: false,
    }, {
        id: '3',
        title: 'Documento 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isRequired: false,
        uploaded: false,
    }];

    get(): Observable<CompanyDocumentDTO[]> {
        console.log('====================================');
        console.log('=== API de documentos da empresa ===');
        console.log('====================================');

        return of(this.mockCompanyDocumentDTO).pipe(
            tap(
                item => item.map(document => new CompanyDocumentDTO(document.id, document.title, document.description, document.isRequired, document.uploaded))
            )
        );   
    }

    update(): Observable<string> {
        console.log('==============================================');
        console.log('=== API de de update documentos da empresa ===');
        console.log('==============================================');
        return of('updated');
    }
}