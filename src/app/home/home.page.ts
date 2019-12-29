import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private userService: UserService) {
    this.userService.getStatsAndHistory()
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

}
