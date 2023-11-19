import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { DatePipe } from '@angular/common';

// class
import { CheckPermissions } from './check-permissions';

// services
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/components/toaster/services/toaster.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private router: Router,
		private storageService: StorageService,
		private toasterService: ToasterService,
		private datePipe: DatePipe
	) { }

	public canActivate(activated: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.routeCheck(activated, state);
	}

	public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.routeCheck(childRoute, state);
	}

	private routeCheck(activated: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const token = this.storageService.getStorage('token');
		const sessionTime = parseInt(this.storageService.getStorage('expirationTime'), 10);
		const now = new Date().getTime();

		if (sessionTime && (sessionTime < now)) {
			this.showMessageSessionExpirate(sessionTime);
			this.redirectToLogin();
			return false;
		}

		if (!token) {
			this.redirectToLogin();
			return false;
		}

		if (typeof activated.data['permissions'] !== 'undefined') {
			const routePermissions = activated.data['permissions'];
			let systemPermissions = [];

			if (this.storageService.getStorage('permissions')) {
				systemPermissions = this.storageService.getStorage('permissions').split(',');
			}

			if (systemPermissions.length) {
				if (!CheckPermissions.check(routePermissions, systemPermissions)) {
					this.router.navigate(['/access-denied']);
				}
			}
		}

		return true;
	}

	private redirectToLogin() {
		this.storageService.clearStorage();
		this.router.navigate(['login']);
	}

	private showMessageSessionExpirate(sessionTime: number) {
		const date = this.datePipe.transform(sessionTime, 'dd/MM/yyyy - HH:mm:ss');
		const message = `Sua sessão expirou em ${date}. Por favor, faça o login novamente!`;
		this.toasterService.warning(message);
	}
}
