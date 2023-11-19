import { Routes } from '@angular/router';

// components
import { ContactsComponent } from './contacts.component';
import { ListComponent } from './list/list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AddComponent } from './add/add.component';

// services
import { AuthGuard } from '../common/auth/auth.guard';

export const contactsRouterConfig: Routes = [{
    path: 'contacts',
    component: ContactsComponent,
    children: [
        {
            path: 'list',
            canActivate: [AuthGuard],
            component: ListComponent
        }, {
            path: 'favorites',
            canActivate: [AuthGuard],
            component: FavoritesComponent
        }, {
            path: 'marker/:id',
            canActivate: [AuthGuard],
            component: ListComponent
        }, {
            path: 'new',
            canActivate: [AuthGuard],
            component: AddComponent
        }, {
            path: 'edit/:id',
            canActivate: [AuthGuard],
            component: AddComponent
        }
    ]
}];
