import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  constructor(public alertController: AlertController, 
              public toastController: ToastController, 
              private authService: AuthService,
              private router: Router) { }

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
      header: 'Voulez vous vraiment vous déconnectez ?',
      message: '',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Se déconnecter',
          handler: () => { 
            this.authService.signOut()
              .then(() => this.router.navigate(['signin']))
              .catch(error => this.router.navigate(['signin']))
          }
        }
      ]
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
