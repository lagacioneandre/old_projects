import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ScoreboardPageComponent } from './scoreboard-page/scoreboard-page.component';
import { StoreModule } from '@ngrx/store';
import { scoreboardReducer } from './scoreboard-page/reducers/scoreboard.reducer';
import { DocumentsCategoryComponent } from './components/documents-category/documents-category.component';
import { CompanyDocumentsComponent } from './components/company-documents/company-documents.component';
import { companyDocumentReducer } from './components/company-documents/reducers/company-documents.reducer';
import { documentCategoryReducer } from './components/documents-category/reducer/documents-category.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScoreboardPageComponent,
    DocumentsCategoryComponent,
    CompanyDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      game: scoreboardReducer,
      companyDocuments: companyDocumentReducer,
      documentCategories: documentCategoryReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
