import { Component, OnInit } from '@angular/core';
import {Users} from '../../models/users';
import {UsersService} from '../../Service/users.service';
import {DetailWindowService} from '../../Service/detail-window.service';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {PicturesService} from '../../Service/pictures.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public user: Users,
              public userService: UsersService,
              public detailWindow: DetailWindowService,
              public router: Router,
              public picturesService: PicturesService
  ) {
    this.userService.loadPostsOfLoggedinOwner();
  }
  ngOnInit() {
  }

  get ownerPosts() {
    return this.userService.ownerPosts();
  }

  showDetails(postObject) {
   // this.detailWindow.activePost = postObject;
    this.detailWindow.setActivePostInLocalStorage(JSON.stringify(postObject));
    this.detailWindow.loadCommentsFromPicture();
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
}
