import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AdminGuardService } from './services/admin-guard.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ScannerService } from './services/scanner.service';


registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuardService,
    UserService,
    AdminGuardService,
    ScannerService,
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
