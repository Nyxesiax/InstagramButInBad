import { Injectable } from '@angular/core';
import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';
import {Post} from '../models/post';
import {AngularFirestore} from '@angular/fire/firestore';
import {UploadImageComponent} from '../components/upload-image/upload-image.component';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private af: AngularFirestore, private uploadData: UploadImageComponent) { }
  private commentArray: PicComment[];
  manageComments(user: string, text: string) {
    const pic = new Pictures(this.uploadData.timestamp, 'picID', this.uploadData.url, 0);
    this.commentArray.push(new PicComment(user, text));
    const p = new Post(pic, this.commentArray);
    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }
}
