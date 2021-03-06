import { DetailWindowService } from '../../Service/detail-window.service';
import { PostService } from 'src/app/Service/post.service';
import { Users } from 'src/app/models/users';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../Service/users.service';
import {Post} from '../../models/post';

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
    public users: Users,
    public router: Router,
    public userService: UsersService
  ) { }

  ngOnInit() {
  }

  get activePost() {
    return this.detailWindowsService.activePost;
  }

  loadComments() {
    this.detailWindowsService.loadCommentsFromPicture();
  }

  manageComment() {
    this.postService.manageComments(this.detailWindowsService.activePost, this.users.email, this.picComment);
  }
 /*
  async switchToUserProfile() {
    this.userService.switchToUserProfile();
  } */

  getUserOfPost(postOwner: Post) {
    this.userService.ownerOfPost = postOwner.owner;
    console.log('Post owner:' + this.userService.ownerOfPost);
    this.router.navigateByUrl('/userProfile');
  }

  async likesUp(post: Post, index: number) {
    post.comments[index].likes++;
    await this.postService.updateCommentLikes(post);
  }

  async likesDown(post: Post, index: number) {
    post.comments[index].likes--;
    await this.postService.updateCommentLikes(post);
  }

  test(index: number) {
    alert(index);
  }
}
