import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { login } from './actions/login-page.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // counter$ = this.store.select(fromCounter.selectCounter);

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    // this.store.pipe(
    //   select(selectValues),
    //   filter(val => val !== undefined)
    // )
    // .subscribe(/* ... */)
  }

  onSubmit(username: string, password: string) {
    this.store.dispatch(login({ username, password }));
  }

}
