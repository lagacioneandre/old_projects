import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addDocumentCategory } from './actions/add-document-category.action';
import { DocumentsCategoryStateModel } from './models/document-category-state.model';
import { DocumentsCategoryService } from './services/documents-category.service';
import { Observable, take } from 'rxjs';
import { IDocumentCategory } from "./models/document-category.interface";

@Component({
  selector: 'app-main-documents',
  templateUrl: './documents-category.component.html',
  styleUrls: ['./documents-category.component.scss'],
})
export class DocumentsCategoryComponent implements OnInit {

  categories$: Observable<IDocumentCategory[]> = this.store.select((state: any) => state.documentCategories);

  constructor(
    private store: Store<DocumentsCategoryStateModel>,
    private documentsCategoryService: DocumentsCategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.select((state: DocumentsCategoryStateModel) => state.documentCategories).subscribe(
      _response => {
        if (!_response.length) {
          setTimeout(() => {
            this.getCategories();
          }, 3000);
        }
      }
    );
  }

  getCategories() {
    this.documentsCategoryService.get() 
    .subscribe(
      _response => {
        _response.map(item => {
          this.store.dispatch(addDocumentCategory({
            category: {
              title: item.title,
              description: item.description,
              completed: item.completed,
              route: item.route,
              id: item.id,
            }
          }))
        });
      }
    )
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
