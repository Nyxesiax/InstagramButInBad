import { Component, OnInit } from '@angular/core';
import { PicturesService } from 'src/app/Service/pictures.service';
import {Router} from '@angular/router';
import {Users} from '../../models/users';
import {AuthenticationService} from '../../Service/authentication.service';
import {DetailWindowService} from '../../Service/detail-window.service';
import {Post} from '../../models/post';
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public picObject;

  // tslint:disable-next-line:max-line-length
  constructor(
    public picturesService: PicturesService,
    public users: Users,
    public router: Router,
    public authentification: AuthenticationService,
    public detailWindowService: DetailWindowService
  ) {
  }
  public picComment: string;
  ngOnInit() {
  }

  // PicArray aus Service für HTML als fake property bereitstellen
  get posts() {
    return this.picturesService.posts();
  }
  async like() {
    await this.picturesService.like();
  }

  async likesUp(pic: Post) {
    pic.picture.likes++;
    await this.picturesService.updatePicture(pic);
  }

  async likesDown(pic: Post) {
    pic.picture.likes--;
    await this.picturesService.updatePicture(pic);
  }

  showDetails(picObject) {
    this.detailWindowService.activePost = picObject;
    this.detailWindowService.loadCommentsFromPicture();
    this.router.navigateByUrl('/detailWindow');
  }

  signOut() {
    return this.authentification.SignOut();
  }
}
