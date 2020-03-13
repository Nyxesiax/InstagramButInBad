import { Component, OnInit } from '@angular/core';
import { DetailWindowService } from '../../Service/detail-window.service';
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

  get activePost() {
    return this.detailWindowsService.activePost;
  }

  get post(): Post {
    return this.detailWindowsService.post;
  }

  loadComments() {
    this.detailWindowsService.loadCommentsFromPicture();
  }

  manageComment() {
    this.postService.manageComments(this.detailWindowsService.activePost, this.users.email,
      this.picComment, this.activePost.picture.URL, this.activePost.picture.likes);
  }

}
