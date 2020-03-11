import { Injectable } from '@angular/core';
import { Pictures } from '../models/pictures';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class DetailWindowService {

  activePicture: Pictures;
  comments: Observable<Comment[]>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.loadCommentsFromPicture();
   }

  loadCommentsFromPicture() {
    if (this.activePicture) {

      // Daten abfragen
      const cmt = this.afs.collection('Comments', ref => {
        // Nur Kommentare zurückgeben welche zum Bild gehören
        return ref.where('picid', '==', this.activePicture.id);
        // "Index" aus Firebase mitspeichern um löschen und so zu ermöglichen
      }).valueChanges({ idField: 'id' });

      // Daten aus Datenbank in comments Array speichern
      this.comments = cmt as Observable<Comment[]>;
      console.log(`Kommentare zum Bild ${this.activePicture.id} geladen`);

    } else {
      console.log('FEHLER: Kein Bild zum laden von Kommentaren ausgewählt!');
    }
  }
}
