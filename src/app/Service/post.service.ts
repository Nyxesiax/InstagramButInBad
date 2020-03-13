import { Injectable } from '@angular/core';
import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';
import {Post} from '../models/post';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { DetailWindowService } from './detail-window.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(
    public af: AngularFirestore,
    public detailWindowService: DetailWindowService
  ) {
    this.posts = this.af.collection('posts').valueChanges({ idField: 'id' }) as any as Observable<Post[]>;
  }

  private commentArray: PicComment[] = [];
  public postId: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;



  createPost(id: string, url: string, description: string, likes: number) {
    const pic = new Pictures(id, url, description, likes, Date.now().toString());
    this.commentArray.push(new PicComment(null, null));
    const p = new Post(pic, this.commentArray);
    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }

  manageComments(post: Post, user: string, text: string, url: string, likes: number) {
    const pic = new Pictures(this.detailWindowService.activePost.picture.id, url, text, likes, Date.now().toString());
    this.commentArray.push(new PicComment(user, text));
    const p = new Post(pic, this.commentArray);
    this.af.collection('posts').doc(post.id
       ).set({
        comments: JSON.parse(JSON.stringify(this.commentArray)),
        picture: JSON.parse(JSON.stringify(pic))
      }
    );
   }
}
