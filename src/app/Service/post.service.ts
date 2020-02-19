import { Injectable } from '@angular/core';
import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';
import {Post} from '../models/post';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private af: AngularFirestore) { }
  private commentArray: PicComment[];
  manageComments(email: string, text: string) {
    const pic = new Pictures(null, 'urlstring', 'asd', 0);
    this.commentArray.push(new PicComment(email, text));
    const p = new Post(pic, this.commentArray);

    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }
}
