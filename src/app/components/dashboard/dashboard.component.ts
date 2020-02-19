import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/Service/pictures.service';
import {UsersService} from '../../Service/users.service';
import {PostService} from '../../Service/post.service';
import {LoginComponent} from '../loginWindow/login.component';
import {Pictures} from '../../models/pictures';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private picturesService: PicturesService, public userService: UsersService, public postService: PostService,
              public router: Router) {
  }
  public picComment: string;
  ngOnInit() {
  }

  // PicArray aus Service für HTML als fake property bereitstellen
  get pictures() {
    return this.picturesService.pictures();
  }
  async like() {
    await this.picturesService.like();
  }

  async likesUp(pic: Pictures) {
    pic.likes++;
    await this.picturesService.updatePicture(pic);
  }

  async likesDown(pic: Pictures) {
    pic.likes--;
    await this.picturesService.updatePicture(pic);
  }
    get currentUser() {
    return this.userService.currentUser;
  }
  manageComment() {
    this.postService.manageComments(this.currentUser.email, this.picComment);
  }

  showDetails() {
    this.router.navigateByUrl('/detailWindow');
  }
}
