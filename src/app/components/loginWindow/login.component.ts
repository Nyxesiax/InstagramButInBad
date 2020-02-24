import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../Service/authentication.service';
import {UsersService} from '../../Service/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  loginForm: FormGroup;
  errorMessage = '';
  email: string;
  password: string;
  constructor(
    private authenticationService: AuthenticationService,
    public userService: UsersService,
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/dashBoard']);
      });
  }

  tryLogin(value){
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/dashBoard']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.userService.SignOut();
  }
}
