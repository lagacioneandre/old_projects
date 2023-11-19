import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofAction, ofActionCompleted, ofActionDispatched, ofActionErrored, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { UpdateDocumentCategory } from '../documents-category/actions/update-document-category.action';
import { UpdateCompanyDocument } from './actions/update-company-document.action';
import { CompanyDocumentStateModel } from './models/company-document-state.model';
import { ICompanyDocument } from './models/company-document.interface';
import { AddCompanyDocumentState } from './states/add-company-document.state';

@Component({
  selector: 'app-company-documents',
  templateUrl: './company-documents.component.html',
  styleUrls: ['./company-documents.component.scss']
})
export class CompanyDocumentsComponent implements OnInit {

  documents$: Observable<CompanyDocumentStateModel>;
  hasDocuments$: Observable<boolean>;

  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
  ) {
    this.documents$ = this.store.select(AddCompanyDocumentState);
    this.hasDocuments$ = this.store.select(AddCompanyDocumentState.hasDocuments);
  }

  ngOnInit(): void {
    this.documents$.subscribe(_response => this.checkIfRequiredDocumentWasUpdated(_response.documents));

    this.actions.pipe(
      ofActionSuccessful(UpdateCompanyDocument)
    ).subscribe(e => console.log('ofActionSuccessful', e));

      this.actions.pipe(
        ofAction(UpdateCompanyDocument)
      ).subscribe(e => console.log('ofAction', e));

      this.actions.pipe(
        ofActionDispatched(UpdateCompanyDocument)
      ).subscribe(e => console.log('ofActionDispatched', e));

      this.actions.pipe(
        ofActionErrored(UpdateCompanyDocument)
      ).subscribe(e => console.log('ofActionErrored', e));

      this.actions.pipe(
        ofActionCompleted(UpdateCompanyDocument)
      ).subscribe(e => console.log('ofActionCompleted', e));
  }

  uploadDocument(document: ICompanyDocument) {
    this.store.dispatch(new UpdateCompanyDocument({
      ...document,
      uploaded: true
    }))
    .pipe(withLatestFrom(this.documents$));
  }

  voltar() {
    this.router.navigate(['']);
  }

  checkIfRequiredDocumentWasUpdated(documents: ICompanyDocument[]) {
    const wasUpdated = !!documents.filter(document => document.isRequired && document.uploaded).length;
    if (!wasUpdated) return;
    const storeSnapshot = this.store.snapshot();
    console.log(storeSnapshot)

    if (storeSnapshot.documentsCategory.documents.length) {
      this.store.dispatch(new UpdateDocumentCategory({
        title: 'Documentos da empresa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: true,
        route: 'company-documents',
        id: '1',
      }));
    }
  }

}
