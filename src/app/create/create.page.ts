import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  productForm: FormGroup;
  imgPath: File = null;
  error: boolean = false;
  errorMessage: string = null;
  barcode: string;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) { 
                if(this.router.getCurrentNavigation().extras.state.barcode) {
                  this.barcode = this.router.getCurrentNavigation().extras.state.barcode;
                }
              }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize form
   */
  initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      categories: ['', Validators.required],
      packaging: ['', Validators.required],
      description: ['', Validators.required],
      img: null
    });
  }

  /* Get file when is upload by user */
  onFileChange(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgPath = file;
    }
  }

  /**
   * Send data to API for create product
   */
  onSubmitForm() {
    if(!this.imgPath) {
      this.error = true;
    } else {
      const formValue = this.productForm.value;
      const bin: any = [];
      switch(formValue.packaging) {
        case 'Sachet plastique':
          bin.push('bleu');
          break;
        case 'Boîte en plastique':
          bin.push('jaune');
          break;
        case 'Boîte en verre':
          bin.push('verre');
          break;
        case 'Boîte en carton':
          bin.push('jaune');
          break;
        case 'Autre':
          bin.push('Autre');
          break;
      }

      const product = new Product(formValue.name, formValue.brand, formValue.categories, formValue.packaging, formValue.description, bin, formValue.img, this.barcode);

      this.productService.addProduct(product, this.imgPath)
        .then(() => { 
            this.router.navigate(['tabs/history']);
        })
        .catch(error => this.errorMessage = error.error.error.message)
    }

  }



}
