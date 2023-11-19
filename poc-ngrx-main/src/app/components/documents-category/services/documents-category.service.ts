import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { DocumentCategoryDTO } from "../models/document-category.dto";

@Injectable({
    providedIn: 'root'
})
export class DocumentsCategoryService {

    private mockDocumentCategoryDTO: DocumentCategoryDTO[] = [{
        title: 'Documentos da empresa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: 'company-documents',
        id: '1',
    }, {
        title: 'Documentos pessoais',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: '',
        id: '2',
    }, {
        title: 'Selfie',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: '',
        id: '3',
    }];

    get(): Observable<DocumentCategoryDTO[]> {
        console.log('========================================');
        console.log('=== API de categorias dos documentos ===');
        console.log('========================================');
        return of(this.mockDocumentCategoryDTO).pipe(
            tap(
                item => item.map( document => new DocumentCategoryDTO(document.title, document.description, document.completed))
            )
        );
    }

    update(): Observable<string> {
        console.log('==================================================');
        console.log('=== API de de update categorias dos documentos ===');
        console.log('==================================================');
        return of('updated');
    }
}