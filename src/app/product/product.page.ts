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
  imgPath: File = null;

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
    this.initForm();
  }

  ionViewWillEnter() {
    const barcode = this.route.snapshot.params['barcode'];
    this.getProduct(barcode);
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

  /* Display alert for delete product */
  alert() {
    this.alertController.create({
      header: 'Voulez vous vraiment supprimer votre produit ?',
      message: 'En appuyant sur ce bouton votre produit sera supprimer de manière définitive',
      //buttons: ['Annuler', 'Suppprimer le produit']
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer le produit',
          handler: () => {
            this.productService.deleteProduct(this.product._id)
            .then(() => {
              this.router.navigate([''])
              .then(() => this.userService.getStatsAndHistory())
            })
            .catch(error => console.log(error));
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  /* Display toast for save information of product */
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

  /* Get product information */
  getProduct(barcode: string) {
    this.productService.getProduct(barcode)
    .then(data => {
      this.product = data;
      this.setValueForm();
    })
    .then(() => this.isOwner())
    .catch(error => console.log(error))
  }

  /* Check if the user is the owner of product */
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

  /* Initialize forms */
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

  /* Set default value of product for form value */
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

  /* Send data when form is submitted */
  onSubmitForm() {
    if(this.productForm.valid) {
      console.log("yo");
      const formValue = this.productForm.value;

      const product = new Product(formValue['name'], formValue['brand'], formValue['categories'], formValue['packaging'], formValue['description'], formValue['bin']);

      this.productService.updateProduct(this.product.barcode, product, this.imgPath)
      .then(() => this.getProduct(this.product.barcode))
      .catch(error => console.log(error));
    }
  }

  /* Get file when is upload by user */
  onFileChange(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgPath = file;
    }
  }


}




