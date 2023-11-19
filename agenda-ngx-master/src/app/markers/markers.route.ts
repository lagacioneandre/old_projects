import { Routes } from '@angular/router';

// services
import { AuthGuard } from '../common/auth/auth.guard';

// components
import { MarkersComponent } from './markers.component';
import { ListComponent } from './list/list.component';
import { ContactsComponent } from './contacts/contacts.component';

export const markersRouterConfig: Routes = [{
    path: 'markers',
    component: MarkersComponent,
    children: [
        {
            path: 'list',
            canActivate: [AuthGuard],
            component: ListComponent
        }, {
            path: ':name/:id',
            canActivate: [AuthGuard],
            component: ContactsComponent
        }
    ]
}];
