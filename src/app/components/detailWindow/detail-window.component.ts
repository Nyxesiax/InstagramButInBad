import { Component, OnInit } from '@angular/core';
import { DetailWindowService } from '../../Service/detail-window.service';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-detail-window',
  templateUrl: './detail-window.component.html',
  styleUrls: ['./detail-window.component.css']
})
export class DetailWindowComponent implements OnInit {

  constructor(
    public detailWindowsService: DetailWindowService
  ) { }

  ngOnInit() {
  }

  get activePicture() {
    return this.detailWindowsService.activePicture;
  }

  get comments(): Observable<Comment[]> {
    return this.detailWindowsService.comments;
  }

  loadComments() {
    this.detailWindowsService.loadCommentsFromPicture();
  }

}
