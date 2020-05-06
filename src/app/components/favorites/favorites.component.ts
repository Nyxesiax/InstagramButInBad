import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../Service/users.service";
import {Users} from "../../models/users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(public userService: UsersService,
              public router: Router) { }

  ngOnInit() {
  }

  get favorites() {
    return this.userService.loadFavorites();
  }

  test() {
    //console.log('ufijdfjfihdwuhferg');
    //this.userService.ownerOfPost = 'hallo@test.de';
    //this.router.navigateByUrl('/userProfile');

  }

}
