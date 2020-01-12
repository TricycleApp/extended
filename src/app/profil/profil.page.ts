import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit {

  public isOpen = false;
  public isEdit = false;

  userId:  string; 
  infoUser: any;
  roleUser: any;
  profilForm: FormGroup;

  constructor(public alertController: AlertController, 
              public toastController: ToastController, 
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder) { 

                this.route.queryParams.subscribe(params => {
                  if(this.router.getCurrentNavigation().extras.state) {
                    if(this.router.getCurrentNavigation().extras.state.edit && this.router.getCurrentNavigation().extras.state.id) {
                      this.userId = this.router.getCurrentNavigation().extras.state.id;
                      this.onEdit();
                    } 
                  } else {
                    this.userId = this.authService.userInfo.userId;
                  }
                });
              }

  ngOnInit() {
    this.initForm();
  }

  ionViewWillEnter() {
    this.getUserProfile(this.userId);
    this.roleUser = this.authService.userInfo.role;
  }

  onShowSettings() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  onEdit() {
    if (this.isEdit && this.profilForm.valid) {
      this.isEdit = false;
      this.toastController.dismiss();
    } else {
      this.isEdit = true;
      this.saveEdit();
      this.isOpen = false;
    }
  }

  /* Display alert when the user want sign out */
  alert() {
    this.alertController.create({
      header: 'Voulez vous vraiment vous déconnecter ?',
      message: '',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Se déconnecter',
          handler: () => { 
            this.authService.signOut()
              .then(() => {
                this.router.navigate(['signin'])
                .then(() => window.location.reload())
              })
              .catch(error => this.router.navigate(['signin']))
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  /* Display toast for edit information of user */
  saveEdit() {
    this.toastController.create({
      color: 'medium',
      position: 'bottom',
      message: 'Enregistrer vos modifications',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.onEdit();
            this.isOpen = false;
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.onEdit();
            this.isOpen = false;
            this.onSubmitForm();
          }
        },

      ]
    }).then(toast => {
      toast.present();
    });
  }

  /* Get information of user */
  getUserProfile(id?: string) {
    this.userService.getInformation(id)
    .then(data => { 
      this.infoUser = data;
      this.setValueForm();
    })
    .catch(error => console.log(error))
  }

  initForm() {
    this.profilForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      timezone: ['', Validators.required]
    });
  }

  /* Set default value of product for form value */
  setValueForm() {
    this.profilForm.setValue({
        fullname: this.infoUser.fullname,
        timezone: this.infoUser.timezone,
        mail: this.infoUser.mail
    });
  }

  /* Send data to api server */
  onSubmitForm() {
    if(this.profilForm.valid) {
      const formValue = this.profilForm.value;
      const user = { fullname: formValue['fullname'], mail: formValue['mail'], timezone: formValue['timezone']};

      this.userService.editInformation(this.userId, user)
      .then(() => this.getUserProfile(this.userId))
      .catch(error => console.log(error))
    }
  }



}
