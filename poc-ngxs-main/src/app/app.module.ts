import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { ZooComponentComponent } from './components/zoo-component/zoo-component.component';
import { AddDocumentCategoryState } from './components/documents-category/states/add-document-category.state';
import { DocumentsCategoryComponent } from './components/documents-category/documents-category.component';
import { ZooState } from './states/zoo.state';
import { AppRoutingModule } from './app-routing.module';
import { CompanyDocumentsComponent } from './components/company-documents/company-documents.component';
import { AddCompanyDocumentState } from './components/company-documents/states/add-company-document.state';

@NgModule({
  declarations: [
    AppComponent,
    ZooComponentComponent,
    DocumentsCategoryComponent,
    CompanyDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AddDocumentCategoryState, ZooState, AddCompanyDocumentState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
