import { Component, OnInit } from '@angular/core';
import {Users} from '../../modules/users';
import {UsersService} from '../../Service/users.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(public service: UsersService) { }

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

  async save() {
    if (! await this.service.save(this.email, this.password, this.username)) {
      alert('Wow, das geht nicht');
    }
  }

}
