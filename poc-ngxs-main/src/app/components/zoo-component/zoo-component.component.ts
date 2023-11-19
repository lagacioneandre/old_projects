import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { AddAnimal } from 'src/app/actions/add-animal.actions';
import { Todo } from 'src/app/actions/todo.namespace.actions';
import { ZooState } from 'src/app/states/zoo.state';

@Component({
  selector: 'app-zoo-component',
  templateUrl: './zoo-component.component.html',
  styleUrls: ['./zoo-component.component.scss']
})
export class ZooComponentComponent {

  // @ts-ignore
  @Select(ZooState) animals$: Observable<string[]>;
  // @Select(ZooState.pandas) pandas$: Observable<string[]>;
  // @Select(state => state.zoo.animals) animals2$: Observable<string[]>;
  // @Select() zoo$: Observable<ZooStateModel>;

  // animals2$: Observable<string[]>;


  // addVideo = new Todo.Add('Add');
  // editVideo = new Todo.Edit('Edit');
  // deleteVideo = new Todo.Delete('Delete');

  constructor(private store: Store) {
    // this.animals$ = this.store.select(state => state.zoo.animals);

      this.store.subscribe(
        _response => console.log('animal added', _response.zoo.feedAnimals)
      )
  }

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name))
      .pipe(withLatestFrom(this.animals$))
      .subscribe(
        _response => console.log('dispatch success', _response)
      );
  }

}
