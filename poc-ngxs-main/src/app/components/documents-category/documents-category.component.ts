import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take, withLatestFrom } from 'rxjs';
import { AddDocumentCategory } from './actions/add-document-category.action';
import { DocumentState } from './models/documents-state.interface';
import { DocumentsCategoryService } from './services/documents-category.service';
import { AddDocumentCategoryState } from './states/add-document-category.state';

@Component({
  selector: 'app-main-documents',
  templateUrl: './documents-category.component.html',
  styleUrls: ['./documents-category.component.scss'],
})
export class DocumentsCategoryComponent implements OnInit {
  // @ts-ignore
  @Select(AddDocumentCategoryState) documents$: Observable<DocumentState>;
  // @ts-ignore
  @Select(AddDocumentCategoryState.hasCategories) hasCategories$: Observable<boolean>;

  constructor(
    private store: Store,
    private documentsCategoryService: DocumentsCategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hasCategories$.pipe(take(1)).subscribe((_response) => {
      if (!_response) this.getCategories();
    });
  }

  getCategories() {
    this.documentsCategoryService.get().subscribe((_response) => {
      _response.map((category) => {
        this.store
          .dispatch(new AddDocumentCategory({
            title: category.title,
            description: category.description,
            completed: category.completed,
            route: category.route,
            id: category.id,
          }))
          .pipe(withLatestFrom(this.documents$));
      });
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
