import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminprodPageRoutingModule } from './adminprod-routing.module';

import { AdminprodPage } from './adminprod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminprodPageRoutingModule
  ],
  declarations: [AdminprodPage]
})
export class AdminprodPageModule {}
