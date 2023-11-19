import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

// services
import { EmitService } from '../../shared/services/emit.service';
import { MarkersService } from '../services/markers.service';
import { ContatosService } from '../../contacts/services/contatos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('inputMarker') inputMarkerRef: ElementRef;
  public messageAlert = 'Buscando marcadores.';
  public erroMessage: string;
  public isEditing: object = {};
  public markersList: Array<Object> = [];
  private markerToRemove: object;
  private destroyRemove: any;

  constructor(
    private emitService: EmitService,
    private markersService: MarkersService,
    private contatosService: ContatosService
  ) {
    this.destroyRemove = this.emitService.confirmRemove$
      .subscribe(
        _response => this.mappingMarkersInContacts()
      );
  }

  ngOnInit() {
    this.getAllMarkers();
  }

  public getAllMarkers() {
    this.markersService.getMarkers().snapshotChanges()
      .subscribe(
        _response => {
          this.emitService.loaderControle(false);
          this.markersList = [];

          if (!_response.length) {
            this.messageAlert = 'Nenhum marcador foi encontrado!';
          } else {
            this.messageAlert = '';

            _response.map(marker => {
              this.markersList.push({
                name: marker['payload'].val().name,
                id: marker['payload'].key
              });
            });
          }
        },
        _error => {
          this.emitService.loaderControle(false);
          this.emitService.toasterConfig({
            tipo: 'error',
            titulo: 'Ooops : (',
            texto: _error || 'Ocorreu algum erro ao obter a lista de marcadores!'
          });
        }
      );
  }

  public saveMarker() {
    let value = this.inputMarkerRef.nativeElement.value;

    if (value.length) {
      if (value.length < 5) {
        this.erroMessage = 'O marcador tem que ter pelo menos 5 caracteres!';
      } else {
        if (this.isEditing['id']) {
          this.editMarker(value);
        } else {
          this.addMarker(value);
        }
      }
    } else {
      this.erroMessage = 'Informe um marcador!';
    }
  }

  public hiddenMessage() {
    if (this.inputMarkerRef.nativeElement.value.length) {
      this.erroMessage = '';
    }
  }

  private addMarker(marker: string) {
    this.markersService.addMarker({ name: marker })
      .then(
        () => {
          this.emitService.toasterConfig({
            tipo: 'success',
            titulo: 'Marcador criado!',
            texto: 'O marcador foi criado com sucesso!'
          });
        },
        error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: error || 'Ocorreu algum erro ao criar o marcador!'
        })
      );
  }

  public edit(marker: object) {
    this.isEditing = marker;
    this.inputMarkerRef.nativeElement.value = marker['name'];
  }

  private editMarker(marker: string) {
    this.isEditing['name'] = marker;

    this.markersService.editMarker(this.isEditing)
      .then(
        () => {
          this.isEditing = {};
          this.inputMarkerRef.nativeElement.value = '';
          this.emitService.toasterConfig({
            tipo: 'success',
            titulo: 'Marcador atualizado!',
            texto: 'O marcador foi atualizado com sucesso!'
          });
        },
        error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: error || 'Ocorreu algum erro ao atualizar o marcador!'
        })
      );
  }

  public delete(marker: object) {
    this.markerToRemove = marker;
    const detalis = {
      title: 'Excluir contato',
      message: 'Você tem certeza que deseja excluir o marcador ' + marker['name'] + '?',
      itemForRemove: marker,
      show: true
    };
    this.emitService.controlConfirmModal(detalis);
  }

  private mappingMarkersInContacts() {
    this.contatosService.getFirebaseContacts().snapshotChanges()
      .subscribe(
        _response => {
          let contactsMarker = [];
          _response.map(contact => {
            contactsMarker.push(contact['payload'].val().marcador);
          });

          this.canRemove(contactsMarker);
        }
      );
  }

  private canRemove(contactsMarker: Array<string>) {
    let canRemove = contactsMarker.indexOf(this.markerToRemove['id']);

    if (canRemove === -1) {
      this.removeMarker();
    } else {
      this.emitService.controlConfirmModal({
        show: false
      });
      this.emitService.toasterConfig({
        tipo: 'warning',
        titulo: 'Ação negada',
        texto: 'Você não pode remover esse marcado pois existem contatos relacionados a ele.'
      });
    }
  }

  private removeMarker() {
    this.markersService.removeMarker(this.markerToRemove['id'])
      .then(
        () => {
          this.emitService.controlConfirmModal({
            show: false
          });
          this.emitService.toasterConfig({
            tipo: 'success',
            titulo: 'Sucesso',
            texto: 'Marcador removido com sucesso!'
          });
        },
        _error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: _error || 'Ocorreu algum erro ao remover o marcador!'
        })
      );
  }

  ngOnDestroy() {
    this.destroyRemove.unsubscribe();
  }

}
