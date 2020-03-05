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
  posts: Observable<Post[]>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.loadCommentsFromPicture();
  }

  loadCommentsFromPicture() {
    if (this.activePicture) {

      // Daten abfragen
      const p = this.afs.collection('posts', ref => {
        // Nur Kommentare zurückgeben welche zum Bild gehören
        return ref.where('picture.id', '==', this.activePicture.id).limit(1);
        // "Index" aus Firebase mitspeichern um löschen und so zu ermöglichen
      }).valueChanges({ idField: 'id' });

      // Daten aus Datenbank in comments Array speichern
      this.posts = p as Observable<Post[]>;

      console.log(`Kommentare zum Bild ${this.activePicture.id} geladen`);

      p.subscribe(pppp => {

        console.table(pppp);

      });


    } else {
      console.log('FEHLER: Kein Bild zum laden von Kommentaren ausgewählt!');
    }
  }
}
