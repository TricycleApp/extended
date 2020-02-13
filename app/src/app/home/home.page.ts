import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ScannerService } from '../services/scanner.service';

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
              private scannerService: ScannerService) {
  }

  /**
   * Get data of user
   * @param event - Reloading page event
   */
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

  /**
   * Scan a product
   */
  scan() {
    this.barcodeScanner.scan()
      .then(barcode => {
        if(!barcode.cancelled) {
          this.scannerService.scan(barcode);
        } 
      })
      .catch(error => this.scannerService.createAlert(error))
  }



}
