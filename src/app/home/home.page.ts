import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  userHistory = [];

  ngOnInit() {
  }

  constructor(private userService: UserService, private barcodeScanner: BarcodeScanner) {
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
      .then(barcode => console.log(barcode))
      .catch(error => console.log(error))
  }

}
