import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  ngOnInit() {
  }

  constructor(public alertController: AlertController) { }

  public isOpen = false;

  onShowSettings(){
    if (this.isOpen){
      this.isOpen = false;
    } else {
      this.isOpen = true;
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

}
