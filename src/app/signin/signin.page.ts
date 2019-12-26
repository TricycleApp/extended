import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  error = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group(
      {
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitLogin() {
    const formValue = this.loginForm.value;
    this.error = this.authService.signInUser(formValue['mail'], formValue['password']);
  }


}
