import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

// services
import { EmitService } from '../../services/emit.service';
import { SortContacts } from '../../../common/sort-contacts/sort-contacts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public controlMenu: EventEmitter<any> = new EventEmitter();

  private visible = true;
  public contentControl = false;
  private elementShowUserMenu;
  public userName: string;
  public userEmail: string;
  private destroyUpdateList: any;
  public noContacts = false;
  public contactsForSearch: Array<object> = [];
  public copyContacts: Array<object> = [];
  public inputSearchModel = '';
  public searchMobile = false;
  public showSearchMobile = false;

  constructor(
    private emitService: EmitService
  ) {
    this.destroyUpdateList = this.emitService.updateContactList$
      .subscribe(
        _response => {
          this.emitService.loaderControle(false);

          if (_response.length) {
            this.noContacts = false;
            this.contactsForSearch = [];
            this.copyContacts = [];
            this.mapContacts(_response);
          } else {
            this.noContacts = true;
          }
        }
      );
  }

  ngOnInit() {
    if (localStorage['contactsScheduleNgx']) {
      let userData = JSON.parse(localStorage['contactsScheduleNgx']);
      this.userName = userData['user'];
      this.userEmail = userData['email'];

    }

    document.addEventListener('click', (event) => {
      if (this.elementShowUserMenu !== event.target) {
        this.contentControl = false;
      }
    }, false);

    if (window.innerWidth <= 768) {
      this.searchMobile = true;
    }
  }

  public toggleMenu() {
    this.visible = !this.visible;
    this.controlMenu.emit(this.visible);
  }

  public showUserMenu(event) {
    this.elementShowUserMenu = event.target;
    this.contentControl = !this.contentControl;
  }

  ngOnDestroy() {
    this.destroyUpdateList.unsubscribe();
  }

  public clearInput() {
    this.inputSearchModel = '';
    this.contactsForSearch = [];
  }

  private mapContacts(contactsList: Array<object>) {
    contactsList.map(index => {
      index['contacts'].map(contact => {
        this.copyContacts.push(contact);
      });
    });
  }

  public search() {
    this.contactsForSearch = [];

    if (this.inputSearchModel.length) {
      let regExp = new RegExp(this.inputSearchModel, 'gi');

      this.copyContacts.map(contact => {
        if (contact['nomeContato'].match(regExp)) {
          this.contactsForSearch.push(contact);
        }
      });
    }
  }

  public showDetails(contact: object) {
    this.resetSearch();
    this.emitService.contactDetails(contact);
    this.showSearchMobile = false;
  }

  private resetSearch() {
    this.inputSearchModel = '';
    this.contactsForSearch = [];
  }

  public toggleMobileSearch() {
    this.resetSearch();
    if (this.searchMobile) {
      this.showSearchMobile = !this.showSearchMobile;
    }
  }

}
