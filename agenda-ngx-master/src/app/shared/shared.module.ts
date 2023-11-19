import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// services
import { EmitService } from './services/emit.service';
import { LoginService } from './templates/login/services/login.service';
import { MarkersService } from '../markers/services/markers.service';
import { PhonePipe } from '../common/pipes/phone-mask.pipe';
import { ContatosService } from '../contacts/services/contatos.service';

// components
import { HeaderComponent } from './templates/header/header.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { LoginComponent } from './templates/login/login.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ListComponent } from './templates/list/list.component';
import { ContactDetailsComponent } from './templates/contact-details/contact-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ConfirmComponent,
    LoaderComponent,
    ToasterComponent,
    ListComponent,
    PhonePipe,
    ContactDetailsComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ConfirmComponent,
    LoaderComponent,
    ToasterComponent,
    ListComponent,
    ContactDetailsComponent
  ],
  providers: [
    EmitService,
    LoginService,
    MarkersService,
    PhonePipe,
    ContatosService
  ]
})
export class SharedModule { }
