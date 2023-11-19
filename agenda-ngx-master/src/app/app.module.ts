import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// locales
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

// components
import { AppComponent } from './app.component';

// services
import { ContatosService } from './contacts/services/contatos.service';
import { EmitService } from './shared/services/emit.service';
import { AuthGuard } from './common/auth/auth.guard';

// modules
import { SharedModule } from './shared/shared.module';
import { ContactsModule } from './contacts/contacts.module';
import { MarkersModule } from './markers/markers.module';

// routes
import { rootRouterConfig } from './app.routes';

// firebase
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    ContactsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    MarkersModule
  ],
  providers: [
    Title,
    ContatosService,
    AngularFireDatabase,
    AuthGuard,
    EmitService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
