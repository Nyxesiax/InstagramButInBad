import { Injectable } from '@angular/core';
import { Pictures } from '../models/pictures';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class DetailWindowService {

  activePicture: Pictures;
  post: Post;

  constructor(
    public afs: AngularFirestore
  ) {
    this.loadCommentsFromPicture();
  }

  loadCommentsFromPicture() {
    if (this.activePicture) {
      // Daten abfragen

      const posts = this.afs.collection('posts', ref => ref.where('picture.id', '==', this.activePicture.id))
        .valueChanges({ idField: 'id' }) as any as Observable<Post>;
      posts.subscribe(postsArr => {
        this.post = postsArr[0];
        console.table(this.post.comments);
      });


    } else {
      console.log('FEHLER: Kein Bild zum laden von Kommentaren ausgewählt!');
    }
  }
}
