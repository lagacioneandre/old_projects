import { Component, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// services
import { EmitService } from '../../services/emit.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [
    trigger('showHidden', [
      state('show', style({
        opacity: 1,
        zIndex: 100
      })),
      state('hidden', style({
        opacity: 0,
        zIndex: -1
      })),
      transition('show <=> hidden', [
        animate('.5s')
      ])
    ])
  ]
})
export class ConfirmComponent implements OnDestroy {
  public detailsModal: object = {};
  private destroyModalConfirm: any;
  public removing = false;

  constructor(
    private emitService: EmitService
  ) {
    this.destroyModalConfirm = this.emitService.controlConfirmModal$
      .subscribe(
        _resonse => {
          this.detailsModal = _resonse;
          this.removing = false;
        }
      );
  }

  public closeConfirm() {
    this.removing = false;
    this.detailsModal['show'] = false;
  }

  public confirmDelete() {
    this.removing = true;
    this.emitService.confirmRemove(this.detailsModal['itemForRemove']);
  }

  ngOnDestroy() {
    this.destroyModalConfirm.unsubscribe();
  }

}
