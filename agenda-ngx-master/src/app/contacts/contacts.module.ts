import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// modules
import { SharedModule } from '../shared/shared.module';

// config
import { contactsRouterConfig } from './contacts.route';

// services
import { MarkersService } from '../markers/services/markers.service';

// components
import { ContactsComponent } from './contacts.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(contactsRouterConfig)
  ],
  declarations: [
    ContactsComponent,
    AddComponent,
    ListComponent,
    FavoritesComponent
  ],
  exports: [
    ListComponent
  ],
  providers: [
    MarkersService
  ]
})
export class ContactsModule { }
