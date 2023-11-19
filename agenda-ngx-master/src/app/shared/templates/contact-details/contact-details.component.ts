import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// service
import { EmitService } from '../../services/emit.service';
import { FavoriteContact } from '../../../common/favorite-contact/favorite-contact';
import { ContatosService } from '../../../contacts/services/contatos.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnDestroy {
  public details: object;
  private destroyContactDetails: any;

  constructor(
    private emitService: EmitService,
    private router: Router,
    private contatosService: ContatosService
  ) {
    this.destroyContactDetails = this.emitService.contactDetails$
      .subscribe(
        details => this.details = details
      );
  }

  public close() {
    this.details = undefined;
  }

  public edit(id: string) {
    this.router.navigate(['/contacts/edit/' + id]);
    this.close();
  }

  public favorite(contact: object) {
    FavoriteContact.Control(contact, this.contatosService, this.emitService);
  }

  public removeContact(contact) {
    const detalis = {
      title: 'Excluir contato',
      message: 'Você tem certeza que deseja remover o contato ' + contact.nomeContato + '?',
      itemForRemove: contact,
      show: true
    };
    this.emitService.controlConfirmModal(detalis);
  }

  ngOnDestroy() {
    this.destroyContactDetails.unsubscribe();
  }

}
