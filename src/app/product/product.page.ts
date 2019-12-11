import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  ngOnInit() {
  }

  constructor() { }

  public isOpen = false;

  onShowSettings(){
    if (this.isOpen){
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

}
