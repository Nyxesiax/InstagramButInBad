
import {Pictures} from '../models/pictures';
import {PicComment} from '../models/pic.comment';
import {Post} from '../models/post';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(
    public af: AngularFirestore
  ) {
    this.posts = this.af.collection('posts').valueChanges({ idField: 'id' }) as any as Observable<Post[]>;
  }
  public posts: Observable<Post[]>;


<<<<<<< HEAD
  createPost(id: string, url: string, description: string, likes: number, owner: string) {
    const pic = new Pictures(id, url, description, likes, Date.now().toString());
    const p = new Post(owner , pic, []);
=======
  createPost(id: string, url: string, description: string, likes: number, tags: string) {
    const pic = new Pictures(id, url, description, likes, new Date().toLocaleTimeString() + ', ' + new Date().toLocaleDateString(), tags);
    const p = new Post(pic, []);
>>>>>>> e7421766975fbb20a95f9d71987801dc3ca8b336
    this.af.collection('posts').add(JSON.parse(JSON.stringify(p)));
  }

  manageComments(post: Post, user: string, text: string) {
    post.comments.push(new PicComment(user, text));
    this.af.collection('posts').doc(post.id
       ).update({
        comments: JSON.parse(JSON.stringify(post.comments)),
        picture: JSON.parse(JSON.stringify(post.picture))
      }
    );
   }
}
