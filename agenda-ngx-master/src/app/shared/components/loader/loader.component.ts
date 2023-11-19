import { Component, OnDestroy } from '@angular/core';

import { EmitService } from '../../services/emit.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {
  public controleLoader = true;
  private unsubscribeLoader: any;

  constructor(
    private emitService: EmitService
  ) {
    this.unsubscribeLoader = this.emitService.loaderControle$
      .subscribe(
        _resposta => this.controleLoader = _resposta
      );
  }

  ngOnDestroy() {
    this.unsubscribeLoader.unsubscribe();
  }

}
