import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { EmitService } from '../../shared/services/emit.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private emitService: EmitService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        this.emitService.setUrlAcessada(state.url);

        if (localStorage['contactsScheduleNgx'] === undefined) {
            this.router.navigate(['/login']);
            return false;
        }

        if (localStorage['contactsScheduleNgx'] !== 'null') {
            let userData = JSON.parse(localStorage['contactsScheduleNgx']);
            let aHourInMiliseconds = 3600000;
            let now = new Date().getTime();

            if (now - userData['time'] > aHourInMiliseconds) {
                localStorage.clear();
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }
}
