import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDocumentsComponent } from './components/company-documents/company-documents.component';
import { DocumentsCategoryComponent } from './components/documents-category/documents-category.component';

const routes: Routes = [{
  path: '',
  component: DocumentsCategoryComponent
}, {
  path: 'company-documents',
  component: CompanyDocumentsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
