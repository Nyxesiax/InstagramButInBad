import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';
import {Post} from '../models/post';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Users} from '../models/users';


@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(
    public af: AngularFirestore,
    public user: Users
  ) {
    this.posts = this.af.collection('posts').valueChanges({ idField: 'id' }) as any as Observable<Post[]>;
  }
  public posts: Observable<Post[]>;

  createPost(id: string, url: string, description: string, likes: number, tags: string, timestamp: Date) {
    console.log(Date.now().toString());
    const pic = new Pictures(id, url, description, likes, tags, /*Date.now().toString() */ timestamp.toString());
    const p = new Post(this.user.email , pic, []);
    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }

  manageComments(post: Post, user: string, text: string) {
    post.comments.push(new PicComment(user, text, 0));
    this.af.collection('posts').doc(post.id
       ).update({
        comments: JSON.parse(JSON.stringify(post.comments)),
        picture: JSON.parse(JSON.stringify(post.picture)),
      }
    );
   }

  async updateCommentLikes(post: Post) {
    this.af.collection('posts').doc(post.id).update({
      comments: JSON.parse(JSON.stringify(post.comments))
    });
  }
}
