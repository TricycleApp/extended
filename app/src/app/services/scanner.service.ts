import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from './user.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private productService: ProductService,
              private alertCtrl: AlertController, 
              private toastCtrl: ToastController,
              private userService: UserService,
              private router: Router) { }
  
  /**
   * Scan product
   * @param barcode 
   */          
  scan(barcode) {
    this.productService.getProduct(barcode.text)
          .then((result: any) => { 
            if(!result.status_verbose) {
              this.addProductFromDbInHistory(result);
            } else if (result.status_verbose == 'product found') {
              // To DO ajouter le produit openfoodfact à la bdd
              this.addProductFromOfInHistory(result);
            } else {
              // Redirigier l'utilisateur vers la page de création d'un produit
              this.addNewProductInDb(barcode);
            }
          })
          .catch(error => this.createAlert(error))
  }

  /**
   * Resolve the bin and packaging for scan product
   * @param packaging
   * @returns { Array } First value : packaging - Second value : bin
   */
  determineBinAndPackaging(packaging) {
    let result = [];
    if(packaging.includes('sachet-plastique') || (packaging.includes('sachet') && packaging.includes('plastique') || (packaging.find(x => x.match(/plastique/i) && packaging.find(x => x.match(/sachet/i)) )))) {
      result.push('Sachet plastique');
      result.push('bleu'); 
    } else if(packaging.includes('boite-plastique') || packaging.includes('plastique') || packaging.find(x => x.match(/plastique/i))) {
      result.push('Boîte en plastique');
      result.push('jaune');
    } else if (packaging.includes('boite-verre') || packaging.includes('verre') || packaging.find(x => x.match(/verre/i))) {
      result.push('Boîte en verre');
      result.push('verre');
    } else if (packaging.includes('carton') || packaging.includes('boite-carton') || packaging.find(x => x.match(/carton/i))) {
      result.push('Boîte en carton');
      result.push('jaune');
    } else if (packaging.includes('conserve') || packaging.find(x => x.match(/conserve/i))) {
      result.push('Conserve');
      result.push('jaune');
    } else {
      result.push('Autre');
      result.push('Autre');
    }
    return result;
  }

  /**
   * Display alert message
   * @param message 
   */
  async createAlert(message) {
    let modal = await this.alertCtrl.create({
      header: 'Erreur',
      message: message,
      buttons: ['Fermer']
    });

    await modal.present();
  }

  /**
   * Display toast
   * @param message 
   */
  async createToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      color: 'medium',
      duration: 3000
    });

    await toast.present();
  }

  /**
   * Add existing product from our database in history of user
   * @param result 
   */
  addProductFromDbInHistory(result) {
    this.userService.addProductInHistory(result)
      .then(() => this.createToast('Produit ajouté à votre historique'))
      .then(() => this.router.navigate([`product/${result.barcode}`]))
      .catch(error => this.createAlert(error))
  }

  /**
   * Add product existing in database Open Food Facts in our database and in history of user
   * @param result 
   */
  addProductFromOfInHistory(result) {
    const binAndPackaging = this.determineBinAndPackaging(result.product.packaging_tags);
    const product = new Product(result.product.product_name, result.product.brands.split(',')[0], result.product.categories.split(',')[0], binAndPackaging[0], result.product.generic_name + ' ', binAndPackaging[1], result.product.image_url, result.product.code)
    
    this.productService.addProduct(product)
      .then(() => this.createToast('Produit ajouté à votre historique'))
      .then(() => this.router.navigate([`product/${result.product.code}`]))
      .catch(error => this.createAlert(error))
  }

  /**
   * Add new product in our database
   * @param barcode 
   */
  addNewProductInDb(barcode) {
    const navigationExtras = {
      state: {
        barcode: barcode.text
      }
    }; 
    this.createToast('Le produit est introuvable dans notre base de données.');
    this.router.navigate(['create'], navigationExtras);
  }


}
