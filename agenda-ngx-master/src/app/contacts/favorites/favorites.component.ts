import { Component, OnInit } from '@angular/core';

// services
import { ContatosService } from '../services/contatos.service';
import { EmitService } from '../../shared/services/emit.service';
import { GetFavoritesOnly } from '../../common/get-favorites-only/get-favorites-only';
import { SortContacts } from '../../common/sort-contacts/sort-contacts';

@Component({
  selector: 'app-favorites',
  template: '<app-list-generic></app-list-generic>'
})
export class FavoritesComponent implements OnInit {

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
        _response => this.emitService.updateContactList(GetFavoritesOnly.Favorites(SortContacts.SortContacts(_response))),
        _error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: _error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

}
