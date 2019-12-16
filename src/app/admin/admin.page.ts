import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  slide(){
    document.querySelector('#swap').classList.toggle('slide');
  }
  slideNext(slides){
    slides.slideTo(2);
  }
  slidePrev(slides){
    slides.slideTo(0);
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
