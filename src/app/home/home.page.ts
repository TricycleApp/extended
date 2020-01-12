import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  userHistory = [];

  ngOnInit() {
  }

  constructor(private userService: UserService) {
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

}
