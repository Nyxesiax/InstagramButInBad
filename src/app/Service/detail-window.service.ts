import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DetailWindowService {

  activePost: Post;
  post: Post;
  postData: string;


  constructor(
    public afs: AngularFirestore
  ) {
    this.loadCommentsFromPicture();
  }

  loadCommentsFromPicture() {
    this.postData = JSON.parse(localStorage.getItem('post'));
    this.activePost = JSON.parse(JSON.stringify(this.postData));
    if (this.activePost) {
      // Daten abfragen

      const posts = this.afs.collection('posts')
        .valueChanges({ idField: 'id' }) as any as Observable<Post>;
      posts.subscribe(postsArr => {
        this.post = postsArr;
        console.table(this.activePost.comments);
      });
    } else {
      console.log('FEHLER: Kein Bild zum laden von Kommentaren ausgewählt!');
    }
  }

  setActivePostInLocalStorage(activePost) {
    localStorage.setItem('post', JSON.parse(JSON.stringify(activePost)));
    this.postData = JSON.parse(localStorage.getItem('post'));
    this.activePost = JSON.parse(JSON.stringify(this.postData));
    console.log('Activepost:' + JSON.stringify(this.activePost));
  }
}
