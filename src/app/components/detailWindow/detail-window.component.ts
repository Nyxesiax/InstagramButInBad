import { Component, OnInit } from '@angular/core';
import { DetailWindowService } from '../../Service/detail-window.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/Service/post.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-detail-window',
  templateUrl: './detail-window.component.html',
  styleUrls: ['./detail-window.component.css']
})
export class DetailWindowComponent implements OnInit {

  picComment: string;

  constructor(
    public detailWindowsService: DetailWindowService,
    public postService: PostService,
    public users: Users
  ) { }

  ngOnInit() {
  }

  get activePicture() {
    return this.detailWindowsService.activePicture;
  }

  get post(): Post {
    return this.detailWindowsService.post;
  }

  loadComments() {
    this.detailWindowsService.loadCommentsFromPicture();
  }

  manageComment() {
    this.postService.manageComments(this.users.email, this.picComment, this.activePicture.URL, this.activePicture.likes);
  }

}
