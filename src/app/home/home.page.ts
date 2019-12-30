import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  userHistory: [{}];

  constructor(private userService: UserService) {
    this.userService.getStatsAndHistory()
    .then((data: [{}]) => {
      this.userHistory = data;
    })
    .catch(error => console.log(error))
  }

}
