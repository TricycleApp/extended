import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  constructor(public alertController: AlertController, public toastController: ToastController) { }

  public isOpen = false;
  public isEdit = false;

  onShowSettings() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  onEdit() {
    if (this.isEdit) {
      this.isEdit = false;
      this.toastController.dismiss();
    } else {
      this.isEdit = true;
      this.saveEdit();
      this.isOpen = false;
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

  saveEdit() {
    this.toastController.create({
      color: 'medium',
      position: 'bottom',
      message: 'Enregistrer vos modifications',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.onEdit();
            this.isOpen = false;
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.onEdit();
            this.isOpen = false;
          }
        },

      ]
    }).then(toast => {
      toast.present();
    });
  }



}
