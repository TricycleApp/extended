import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminuserPageRoutingModule } from './adminuser-routing.module';

import { AdminuserPage } from './adminuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminuserPageRoutingModule
  ],
  declarations: [AdminuserPage]
})
export class AdminuserPageModule {}
