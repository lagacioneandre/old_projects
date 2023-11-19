import { Routes } from '@angular/router';

// components
import { LoginComponent } from './shared/templates/login/login.component';

export const rootRouterConfig: Routes = [{
    path: '',
    redirectTo: 'contacts/list',
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent
}];
