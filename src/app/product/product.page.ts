import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: any;
  owner: boolean;
  productForm: FormGroup;

  public isOpen = false;
  public isEdit = false;


  constructor(public alertController: AlertController, 
              public toastController: ToastController,
              private route: ActivatedRoute, 
              private productService: ProductService, 
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) { 
              }

  ngOnInit() {
    const barcode = this.route.snapshot.params['barcode'];
    this.getProduct(barcode);
    this.isOwner();
    this.initForm();
  }

  onShowSettings() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }


  onEdit() {
    if (this.isEdit && this.productForm.valid) {
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
            this.onSubmitForm();
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
      this.setValueForm();
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

  initForm() {
    this.productForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        brand: ['', Validators.required],
        categories: ['', Validators.required],
        bin: ['', Validators.required],
        packaging: ['', Validators.required],
        description: ['', Validators.required],
        img: null
      }
    )
  }

  setValueForm() {
    this.productForm.setValue({
        name: this.product.name,
        brand: this.product.brand,
        categories: this.product.categories,
        bin: this.product.bin,
        packaging: this.product.packaging,
        description: this.product.description,
        img: null
    });
  }

  onSubmitForm() {
      const formValue = this.productForm.value;
      const product = new Product(formValue['name'], formValue['brand'], formValue['categories'], formValue['packaging'], formValue['description'], formValue['bin'], formValue['img']);

      this.productService.updateProduct(this.product.barcode, product)
      .then(() => this.getProduct(this.product.barcode))
      .catch(error => console.log(error));
  }


}




