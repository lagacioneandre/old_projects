import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ZooState } from './states/zoo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs';

  // @ts-ignore
  // @Select(ZooState.pandas) pandas$: Observable<string[]>;
}
