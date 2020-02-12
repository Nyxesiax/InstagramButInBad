import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private af: AngularFirestore) { this.foo(); }
  private allComments: Observable<Comment[]>;
  public comment: string;
  public uimageID: string;
  public uID: string;

  saveComment(comment: string, uimageID: string, uID: string) {
    try {
      this.af.collection('Comments').add({
        'Content': comment,
        'UImage.ID': uimageID,
        'User.ID': uID
      });
      this.comment = comment;
      this.uimageID = uimageID;
      this.uID = uID;
      return true;
    } catch (e) {
      return false;
    }
  }

  foo() {
    const pic = new Pictures(null, 'urlstring', 'asd');
    const c1 = new PicComment('Meier', 'doofed Bild');
    const c2 = new PicComment('Müller', 'immer doofedasd Bild');

    const p = new Post(pic, [c1, c2]);

    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }
}
