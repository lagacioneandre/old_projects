import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// module
import { SharedModule } from '../shared/shared.module';

// config
import { markersRouterConfig } from './markers.route';

// services
import { EmitService } from '../shared/services/emit.service';
import { MarkersService } from './services/markers.service';
import { ContatosService } from '../contacts/services/contatos.service';

// components
import { MarkersComponent } from './markers.component';
import { ListComponent } from './list/list.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(markersRouterConfig),
    SharedModule
  ],
  declarations: [
    MarkersComponent,
    ListComponent,
    ContactsComponent
  ],
  exports: [
    ListComponent
  ],
  providers: [
    EmitService,
    MarkersService,
    ContatosService
  ]
})
export class MarkersModule { }
