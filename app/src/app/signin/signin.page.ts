import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  error = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  /** Initialize form */
  initForm() {
    this.loginForm = this.formBuilder.group(
      {
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  /** Catch data when login form data submited */
  onSubmitLogin() {
    const formValue = this.loginForm.value;
    this.authService.signInUser(formValue['mail'], formValue['password'])
      .then(() => {
        this.error = false;
        this.router.navigate(['']) 
      })
      .catch((error) => {
          this.error = true;
       });
  }


}
