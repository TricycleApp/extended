import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { ProductPage } from '../product/product.page';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  products: any;
  users: any;

  constructor(public alertController: AlertController,
              private productService: ProductService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
      this.getProducts();
      this.getUsers();
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

  /** Get all products */
  getProducts() {
    this.productService.getAll()
      .then(data => this.products = data)
      .catch(error => console.log(error))
  }

  /** Get all users */
  getUsers() {
    this.userService.getAllUsers()
      .then(users => this.users = users)
      .catch(error => console.log(error))
  }

  /* Redirect to profil edit page */
  onEditUser(id: string) {
    let navigationExtras : NavigationExtras = {
      state: {
        edit: true,
        id: id
      }
    };
    this.router.navigate(['tabs/profil'], navigationExtras);
  }

  /* Display alert for delete user */
  alertDelete(id: string) {
    this.alertController.create({
      header: 'Voulez vous vraiment supprimer cet utilisateur ?',
      message: 'En appuyant sur ce bouton l\'utilisateur sera supprimé de manière définitive',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer l\'utilisateur ',
          handler: () => {
            this.userService.deleteUser(id)
              .then(() => this.getUsers())
              .catch(error => console.log(error))
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  onDeleteUser(id: string) {
    this.alertDelete(id);
  }

  /** Redirect to product page for edit product */
  onEditProduct(barcode: string) {
    let navigationExtras : NavigationExtras = {
      state: {
        edit: true
      }
    };
    this.router.navigate([`product/${barcode}`], navigationExtras);
  }

  /** Redirect to product page for delete product */
  onDeleteProduct(barcode: string, id: string) {
    let navigationExtras : NavigationExtras = {
      state: {
        delete: true
      }
    };
    this.router.navigate([`product/${barcode}`], navigationExtras);
  }





}
