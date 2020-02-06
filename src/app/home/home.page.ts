import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

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
        if(!barcode.cancelled) {
          this.productService.getProduct(barcode.text)
          .then((result: any) => { 
            if(!result.status_verbose) {
              this.addProductFromDbInHistory(result);
            } else if (result.status_verbose == 'product found') {
              // To DO ajouter le produit openfoodfact à la bdd
              console.log('produit trouvéeeeeeee');
              this.addProductFromOfInHistory(result);
            } else {
              // Redirigier l'utilisateur vers la page de création d'un produit 
              console.log('produit introuvableee');
            }
          })
          .catch(error => this.createAlert(error))
        } 
      })
      .catch(error => this.createAlert(error))
  }

  determineBinAndPackaging(packaging) {
    let result = [];
    if(packaging.includes('sachet-plastique') || (packaging.includes('sachet') && packaging.includes('plastique'))) {
      result.push('Sachet plastique');
      result.push('bleu'); 
    } else if(packaging.includes('boite-plastique') || packaging.includes('plastique')) {
      result.push('Boîte en plastique');
      result.push('jaune');
    } else if (packaging.includes('boite-verre') || packaging.includes('verre')) {
      result.push('Boîte en verre');
      result.push('verre');
    } else if (packaging.includes('carton') || packaging.includes('boite-carton')) {
      result.push('Boîte en carton');
      result.push('jaune');
    } else if (packaging.includes('conserve')) {
      result.push('Conserve');
      result.push('jaune');
    } else {
      result.push(packaging[0]);
      result.push('Autre');
    }
    return result;
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

  addProductFromDbInHistory(result) {
    this.userService.addProductInHistory(result)
      .then(() => this.createToast('Produit ajouté à votre historique'))
      .then(() => this.router.navigate([`product/${result.barcode}`]))
      .catch(error => this.createAlert(error))
  }

  addProductFromOfInHistory(result) {
    const binAndPackaging = this.determineBinAndPackaging(result.product.packaging_tags);
    const product = new Product(result.product.product_name, result.product.brands.split(',')[0], result.product.categories.split(',')[0], binAndPackaging[0], result.product.generic_name + ' ', binAndPackaging[1], result.product.image_url, result.product.code)
    
    this.productService.addProduct(product)
      .then(() => this.createToast('Produit ajouté à votre historique'))
      .then(() => this.router.navigate([`product/${result.product.code}`]))
      .catch(error => this.createAlert(error))
  }

}
