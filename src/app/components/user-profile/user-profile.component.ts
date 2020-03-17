import { Component, OnInit } from '@angular/core';
import {Users} from '../../models/users';
import {UsersService} from '../../Service/users.service';
import {DetailWindowService} from '../../Service/detail-window.service';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {PicturesService} from '../../Service/pictures.service';
import {AuthenticationService} from '../../Service/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public user: Users,
              public userService: UsersService,
              public detailwindow: DetailWindowService,
              public router: Router,
              public picturesService: PicturesService,
              public authentification: AuthenticationService
  ) { }
  ngOnInit() {
  }

  get ownerPosts() {
    return this.userService.ownerPosts();
  }

  showDetails(postObject) {
    this.detailwindow.activePost = postObject;
    this.detailwindow.loadCommentsFromPicture();
    this.router.navigateByUrl('/detailWindow');
  }

  async likesUp(post: Post) {
    post.picture.likes++;
    await this.picturesService.updatePicture(post);
  }

  async likesDown(post: Post) {
    post.picture.likes--;
    await this.picturesService.updatePicture(post);
  }

  signOut() {
    return this.authentification.signOut();
  }
}
