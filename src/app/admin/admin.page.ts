import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slide(){
    document.querySelector('#swap').classList.toggle('slide');
  }
  slideNext(slides){
    slides.slideTo(2);
  }
  slidePrev(slides){
    slides.slideTo(0);
  }
}
