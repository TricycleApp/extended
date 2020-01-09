import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AdminGuardService } from '../services/admin-guard.service';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'history',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../history/history.module').then(m => m.HistoryPageModule)
          }
        ]
      },
      {
        path: 'profil',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profil/profil.module').then(m => m.ProfilPageModule)
          }
        ]
      },
      {
        path: 'detail/:barcode',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../product/product.module').then(m => m.ProductPageModule)
          }
        ]
      },
      {
        path: 'admin',
        canActivate: [AdminGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../admin/admin.module').then(m => m.AdminPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
