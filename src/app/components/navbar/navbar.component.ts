import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Service/authentication.service';
import {Users} from '../../models/users';
import {UsersService} from '../../Service/users.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchterm: string;
  searchForm: FormGroup;

  /*
  startAt = new Subject();
  endAt = new Subject();

  clubs;
  allclubs;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable(); */
  constructor(public authService: AuthenticationService, public user: Users, public userService: UsersService, public router: Router) {
  }

  signOut() {
    this.authService.signOut();
  }

  isAuthenticated() {
    // console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  getUserOfPost() {
    this.userService.ownerOfPost = this.user.email;
    this.router.navigateByUrl('/userProfile');
  }

  ngOnInit() {
  }

  search(searchterm) {
    console.log(this.searchterm);
    return this.userService.searchUser(searchterm);
  }
}
