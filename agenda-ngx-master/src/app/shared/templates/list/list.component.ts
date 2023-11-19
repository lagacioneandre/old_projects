import { Component, OnDestroy } from '@angular/core';

// services
import { ContatosService } from '../../../contacts/services/contatos.service';
import { EmitService } from '../../services/emit.service';
import { ShowMoreOption } from '../../../common/show-more-options/show-more-options';
import { FavoriteContact } from '../../../common/favorite-contact/favorite-contact';

@Component({
  selector: 'app-list-generic',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  private destroyUpdateList: any;
  private destroyConfimrRemove: any;
  public showMessageEmpty = false;
  public myContactsOrdered: Array<object>;
  public topValue: string;

  constructor(
    private emitService: EmitService,
    private contatosService: ContatosService
  ) {
    this.destroyUpdateList = this.emitService.updateContactList$
      .subscribe(
        _response => {
          this.emitService.loaderControle(false);

          if (_response.length) {
            this.myContactsOrdered = _response;
            this.showMessageEmpty = false;
          } else {
            this.myContactsOrdered = [];
            this.showMessageEmpty = true;
          }
        }
      );

    this.destroyConfimrRemove = this.emitService.confirmRemove$
        .subscribe(
          _respose => this.confirmDelete(_respose)
        );
  }

  ngOnDestroy() {
    this.destroyUpdateList.unsubscribe();
    this.destroyConfimrRemove.unsubscribe();
  }

  public selectContact(contact) {
    contact.isSelected = !contact.isSelected;
  }

  public showMoreOptions(event, contact) {
    this.topValue = ShowMoreOption.Show(event, contact);
  }

  public hideContact(contact) {
    contact.hidden = true;
    contact.selected = false;
    contact.showOptions = false;
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

  public confirmDelete(contact: object) {
    if (contact) {
      this.contatosService.removerContato(contact['id'])
        .then(
          () => {
            this.emitService.contactDetails(null);
            this.emitService.controlConfirmModal({
              show: false
            });
            this.emitService.toasterConfig({
              tipo: 'success',
              titulo: 'Sucesso!',
              texto: 'Contato removido com sucesso!'
            });
            this.removeImage(contact['nomeImagem']);
          },
          error => this.emitService.toasterConfig({
            tipo: 'error',
            titulo: 'Ooops : (',
            texto: error || 'Ocorreu algum erro ao favoritar o contato.'
          })
        );
    }
  }

  public hiddenMoreOptions(contact) {
    contact.showOptions = false;
  }

  public favoritarContato(contact) {
    FavoriteContact.Control(contact, this.contatosService, this.emitService);
  }

  private removeImage(name: string) {
    this.contatosService.removeImage(name);
  }

  public showDetails(contact: object) {
    this.emitService.contactDetails(contact);
  }

}
