import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../Service/users.service';
import {AuthenticationService} from '../../Service/authentication.service';
import {Users} from '../../models/users';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(public service: UsersService, public authService: AuthenticationService) { }

  public email: string;
  public password: string;
  public username: string;

  get getUsers(): any {
    return this.service.users;
  }

  ngOnInit() {
  }

  del(user: Users) {
    this.service.del(user);
  }

  signUp() {
    this.authService.SignUp(this.email, this.password);
  }
}
