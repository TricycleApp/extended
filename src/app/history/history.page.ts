import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {

  productsHistory: [{}];

  constructor(private userService: UserService) {}

  ionViewWillEnter() {
    this.userService.getAllHistory()
      .then((data: any) => { 
        for(let index in data[0].productInfo) {
          data[0].history[index].productInfo = data[0].productInfo[index];
        }
        this.productsHistory = data[0].history;
        this.productsHistory.sort((a : any, b: any) => { 
            a = new Date(a.date_scan);
            b = new Date(b.date_scan);
            return b - a;
          });
      })
      .catch(error => console.log(error))
  }


}
