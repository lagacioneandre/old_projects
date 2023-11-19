import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showMenu = true;

  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.showMenu = false;
    }
  }

  public onControlMenu() {
    this.showMenu = !this.showMenu;
  }
}
