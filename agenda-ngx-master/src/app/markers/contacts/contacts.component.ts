import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// services
import { ContatosService } from '../../contacts/services/contatos.service';
import { EmitService } from '../../shared/services/emit.service';
import { SortContacts } from '../../common/sort-contacts/sort-contacts';
import { ContactsByMarker } from '../../common/contacts-by-marker/contacts-by-marker';

@Component({
  selector: 'app-contacts',
  template: '<app-list-generic></app-list-generic>'
})
export class ContactsComponent implements OnInit, OnDestroy {
  private idMarker: string;
  private controlRequest = false;
  private unsubscribeIdSubcategory: any;

  constructor(
    private contatosService: ContatosService,
    private emitService: EmitService,
    private router: Router
  ) {
    this.unsubscribeIdSubcategory = this.emitService.emitIdSubcategory$
      .subscribe(
        _response => {
          if (_response) {
            this.controlRequest = true;
            this.idMarker = _response;
            this.getContacts();
          }
        }
      );
  }

  ngOnInit() {
    setTimeout(() => {
      if (!this.controlRequest) {
        let splitUrl = this.router.url.split('/');
        this.idMarker = splitUrl[3];
        this.getContacts();
      }
    });
  }

  private getContacts() {
    this.contatosService.getFirebaseContacts()
      .snapshotChanges()
      .subscribe(
        _response => {
          let _sortContacts = SortContacts.SortContacts(_response);
          let _contactsByMarker = ContactsByMarker.GetContacts(_sortContacts, this.idMarker);
          this.emitService.updateContactList(_contactsByMarker);
        },
        _error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: _error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

  ngOnDestroy() {
    this.unsubscribeIdSubcategory.unsubscribe();
  }

}
