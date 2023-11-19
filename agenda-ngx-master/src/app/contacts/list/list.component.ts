import { Component, OnInit } from '@angular/core';

// services
import { ContatosService } from '../services/contatos.service';
import { EmitService } from '../../shared/services/emit.service';
import { SortContacts } from '../../common/sort-contacts/sort-contacts';

@Component({
  selector: 'app-list',
  template: '<app-list-generic></app-list-generic>'
})
export class ListComponent implements OnInit {

  constructor(
    private contatosService: ContatosService,
    private emitService: EmitService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  private getContacts() {
    this.contatosService.getFirebaseContacts()
      .snapshotChanges()
      .subscribe(
        _response => this.emitService.updateContactList(SortContacts.SortContacts(_response)),
        _error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: _error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

}
