import { Component, OnInit } from '@angular/core';
import {Users} from '../../modules/users';
import {UsersService} from '../../Service/users.service';
import {AuthenticationService} from "../../Service/authentication.service";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
  constructor(
    private authenticationService:AuthenticationService
  ) {
  }

  email: string;
  password: string;

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }



}
