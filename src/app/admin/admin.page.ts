import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { ProductPage } from '../product/product.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  products: any;

  constructor(public alertController: AlertController,
              private productService: ProductService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.productService.getAll()
      .then(data => this.products = data)
      .catch(error => console.log(error))
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
    message: 'En appuyant sur ce bouton votre produit sera supprimé de manière définitive',
    buttons: ['Annuler', 'Suppprimer le produit']
  }).then(alert => {
     alert.present();
  });
}


}
