import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  ngOnInit() {
  }

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
      header: 'Voulez vous vraiment supprimer votre produit ?',
      message: 'En appuyant sur ce bouton votre produit sera supprimer de manière définitive',
      buttons: ['Annuler', 'Suppprimer le produit']
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
