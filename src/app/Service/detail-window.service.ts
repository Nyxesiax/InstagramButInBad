import { Injectable } from '@angular/core';
import { Pictures } from '../models/pictures';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class DetailWindowService {

  activePost: Post;
  post: Post;

  constructor(
    public afs: AngularFirestore
  ) {
    this.loadCommentsFromPicture();
  }

  loadCommentsFromPicture() {
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
}
