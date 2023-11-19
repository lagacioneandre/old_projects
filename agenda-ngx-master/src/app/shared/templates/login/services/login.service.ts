import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class LoginService {
    public user: Observable<firebase.User>;
    public emitLoginError$: EventEmitter<string>;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.user = this.afAuth.authState;
        this.emitLoginError$ = new EventEmitter();
    }

    public login(mail: string, pass: string, urlAcessada: string) {
        return new Promise(() => {
            this.afAuth.auth.signInWithEmailAndPassword(mail, pass).then(user => {
                let userData = {
                    token: user.user['qa'],
                    email: user.user.providerData[0].email,
                    user: user.user.providerData[0].displayName,
                    time: '' + new Date().getTime()
                };

                localStorage.setItem('contactsScheduleNgx', JSON.stringify(userData));
                this.router.navigate(['']);

                if (urlAcessada) {
                    this.router.navigate([urlAcessada]);
                } else {
                    this.router.navigate(['']);
                }
            }, error => {
                this.emitLoginErro(error);
            });
        });
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }

    public emitLoginErro(erro: string) {
        this.emitLoginError$.emit(erro);
    }
}
