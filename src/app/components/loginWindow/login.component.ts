import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../Service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  email: string;
  password: string;


  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }

}
