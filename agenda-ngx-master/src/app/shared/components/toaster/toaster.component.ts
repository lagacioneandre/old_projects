import { Component, Input, OnDestroy } from '@angular/core';
import { EmitService } from '../../services/emit.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnDestroy {
  public toasterList: Array<object> = [];
  private idToaster = 1;
  private unsubscribeToasterConfig: any;

  constructor(
    private emitService: EmitService
  ) {
    this.unsubscribeToasterConfig = this.emitService.toasterConfig$
      .subscribe(
        _config => {
          this.toasterList.push({
            id: this.idToaster,
            tipo: _config['tipo'],
            titulo: _config['titulo'],
            texto: _config['texto']
          });

          this.idToaster++;
          this.controleTempoHiddenToaster();
        }
      );
  }

  public hiddenToaster(id) {
    for (let i = 0; i < this.toasterList.length; i++) {
      if (id === this.toasterList[i]['id']) {
        this.toasterList.splice(i, 1);
      }
    }
  }

  private controleTempoHiddenToaster() {
    const controlTimeout = setTimeout(() => {
      this.toasterList.splice(0, 1);
      clearTimeout(controlTimeout);

      if (this.toasterList.length) {
        this.controleTempoHiddenToaster();
      }
    }, 5000);
  }

  ngOnDestroy() {
    this.unsubscribeToasterConfig.unsubscribe();
  }

}
