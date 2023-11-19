import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { MarkersService } from '../../../markers/services/markers.service';
import { EmitService } from '../../services/emit.service';
import { ContatosService } from '../../../contacts/services/contatos.service';
import { ExportContacts } from '../../../common/export/export';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public markersList: Array<object>;
  public controlSubMarkers = false;
  public controlSubMore = false;

  constructor(
    private markersService: MarkersService,
    private emitService: EmitService,
    private contatosService: ContatosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMarkers();
  }

  public showSubcategory(item: object) {
    item['showSubcategories'] = !item['showSubcategories'];
    return false;
  }

  private getMarkers() {
    let cat = [];
    this.markersService.getMarkers().snapshotChanges()
      .subscribe(
        _response => {
          _response.map(marker => {
            let name = marker['payload'].val().name;
            let id = marker['payload'].key;

            cat.push({
              name: name,
              rota: '/markers/' + name + '/' + id,
              id: id
            });
          });

          cat.push({
            name: 'Criar marcador',
            rota: '/markers/list'
          });

          this.markersList = cat;
        }
      );
  }

  public emitIdCategory(id: string, nameRoute: string) {
    this.emitService.emitIdSubcategory(id);
  }

  public exportAllContacts() {
    this.contatosService.getFirebaseContacts()
      .snapshotChanges()
      .subscribe(
        _response => {
          let contactsList: Array<object> = [];
          _response.map(contact => {
            contactsList.push(contact['payload'].val());
          });

          this.mapMarker(contactsList);
          ExportContacts.CsvGenerate(contactsList);
        },
        _error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: _error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

  private mapMarker(contacts: Array<object>) {
    for (let item of contacts) {
      for (let marker of this.markersList) {
        if (item['marcador'] === marker['id']) {
          item['marcador'] = marker['name'];
          break;
        }
      }
    }
  }

}
