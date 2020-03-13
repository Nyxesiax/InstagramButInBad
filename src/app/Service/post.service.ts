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

  public postId: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;


  createPost(id: string, url: string, description: string, likes: number) {
    const pic = new Pictures(id, url, description, likes, Date.now().toString());
    const p = new Post(pic, []);
    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }

  manageComments(post: Post, user: string, text: string, url: string, likes: number) {
    post.comments.push(new PicComment(user, text));
    this.af.collection('posts').doc(post.id
       ).update({
        comments: JSON.parse(JSON.stringify(post.comments)),
        picture: JSON.parse(JSON.stringify(post.picture))
      }
    );
   }
}
