import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: any;
  owner: boolean;

  constructor(public alertController: AlertController, public toastController: ToastController, private route: ActivatedRoute, private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    const barcode = this.route.snapshot.params['barcode'];
    this.getProduct(barcode);
    this.isOwner();
  }

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

  getProduct(barcode: string) {
    this.productService.getProduct(barcode)
    .then(data => {
      this.product = data;
    })
    .catch(error => console.log(error))
  }

  isOwner() {
    this.userService.getAllHistory()
    .then((data: any) => {
      let result = data[0].history.find(elm => elm.product == this.product._id);
      if(result == undefined) {
        this.owner = false;
      } else {
        this.owner = result.owner;
      }
    })
    .catch(error => console.log(error))
  }

}
