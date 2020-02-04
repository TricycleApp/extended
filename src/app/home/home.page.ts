import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  userHistory = [];

  ngOnInit() {
  }

  constructor(private userService: UserService, 
              private barcodeScanner: BarcodeScanner, 
              private productService: ProductService, 
              private alertCtrl: AlertController,
              private router: Router,
              private toastCtrl: ToastController) {
  }


  getData(event?: any) {
    this.userService.getStatsAndHistory()
    .then((data: [{}]) => {
      this.userHistory = data;
      if(event) {
        event.target.complete();
      }
    })
    .catch(error => console.log(error))
  }

  ionViewWillEnter() {
    this.getData();
  }

  scan() {
    this.barcodeScanner.scan()
      .then(barcode => { 
        this.productService.getProduct(barcode.text)
        .then((result: any) => { 
          if(!result.status_verbose) {
            this.userService.addProductInHistory(result)
            .then(() => this.createToast('Produit scanné et ajouté à votre historique'))
            .then(() => this.router.navigate([`product/${result.barcode}`]))
            .catch(error => this.createAlert(error))
          } else if (result.status_verbose == 'product found') {
            // To DO ajouter le produit openfoodfact à la bdd
            console.log('produit trouvé');
          } else {
            // Redirigier l'utilisateur vers la page de création d'un produit 
            console.log('produit introuvable');
          }
        })
        .catch(error => this.createAlert(error))
      })
      .catch(error => this.createAlert(error))
  }

  async createAlert(message) {
    let modal = await this.alertCtrl.create({
      header: 'Erreur',
      message: message,
      buttons: ['Fermer']
    });

    await modal.present();
  }

  async createToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      color: 'medium',
      duration: 3000
    });

    await toast.present();
  }

}
