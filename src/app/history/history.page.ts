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

        for(let i in data[0].history) {
          for(let j in data[0].productInfo) {
            if(data[0].history[i].product == data[0].productInfo[j]._id) {
              data[0].history[i].productInfo = data[0].productInfo[j];
            }
          }
        }

        this.productsHistory = data[0].history;
        console.log(this.productsHistory);
        this.productsHistory.sort((a : any, b: any) => { 
            a = new Date(a.date_scan);
            b = new Date(b.date_scan);
            return b - a;
          });
          
      })
      .catch(error => console.log(error))
  }


}
