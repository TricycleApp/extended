import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  constructor(public alertController: AlertController) {}

  public isOpen = false;
  public isEdit = false;

  onShowSettings(){
    if (this.isOpen){
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  onEdit(){
    if (this.isEdit){
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  alert() {
      this.alertController.create({
      header: 'Voulez vous vraiment supprimer votre profil ?',
      message: 'En appuyant sur ce bouton votre profil sera supprimer de manière définitive',
      buttons: ['Annuler', 'Suppprimer le profil']
    }).then(alert => {
       alert.present();
    });
  }
}
