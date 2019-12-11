import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  constructor() {}

  public isOpen = false;

  onShowSettings(){
    if (this.isOpen){
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
}
