import { Component, OnInit } from '@angular/core';
import { DetailWindowService } from '../../Service/detail-window.service';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/Service/post.service';
import { Pictures } from 'src/app/models/pictures';
import { Users } from 'src/app/models/users';
import { PicComment } from 'src/app/models/pic.comment';

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

  get posts(): Observable<Post[]> {
    return this.detailWindowsService.posts;
  }

  get comments() {
    return this.detailWindowsService.posts.comments;
  }

  loadComments() {
    this.detailWindowsService.loadCommentsFromPicture();
  }

  manageComment() {
    this.postService.manageComments(this.users.email, this.picComment, this.activePicture.URL, this.activePicture.likes);
  }

}
