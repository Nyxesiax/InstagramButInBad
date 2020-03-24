import { PicturesService } from 'src/app/Service/pictures.service';
import {Users} from '../../models/users';
import {DetailWindowService} from '../../Service/detail-window.service';
import {Post} from '../../models/post';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../Service/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// tslint:disable-next-line:max-line-length
  constructor(
    public picturesService: PicturesService,
    public users: Users,
    public router: Router,
    public detailWindowService: DetailWindowService,
    public userService: UsersService
  ) {
  }
  ngOnInit() {
  }

  // PicArray aus Service für HTML als fake property bereitstellen
  get posts() {
    return this.picturesService.posts();
  }
  async like() {
    await this.picturesService.like();
  }

  async likesUp(post: Post) {
    post.picture.likes++;
    await this.picturesService.updatePicture(post);
  }

  async likesDown(post: Post) {
    post.picture.likes--;
    await this.picturesService.updatePicture(post);
  }

  showDetails(picObject) {
    this.detailWindowService.activePost = picObject;
    this.detailWindowService.loadCommentsFromPicture();
    this.detailWindowService.setActivePostInLocalStorage(JSON.stringify(this.detailWindowService.activePost));
    this.router.navigateByUrl('/detailWindow');
  }
/*
  switchToUserProfile() {
    return this.userService.switchToUserProfile();
  } */

  getUserOfPost(postOwner: Post) {
    this.userService.ownerOfPost = postOwner.owner;
    console.log('Post owner:' + this.userService.ownerOfPost);
    this.router.navigateByUrl('/userProfile');
  }
}
