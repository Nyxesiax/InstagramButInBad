import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Service/authentication.service';
import {Users} from '../../models/users';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 /* searchterm: string;

  startAt = new Subject();
  endAt = new Subject();

  clubs;
  allclubs;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable(); */
  constructor(public authService: AuthenticationService, public user: Users) {}

  signOut() {
    this.authService.signOut();
  }

  isAuthenticated() {
    console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
  }
}
