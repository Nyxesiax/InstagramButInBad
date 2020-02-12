import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore/firestore.module';
import { Observable } from 'rxjs';
import { Pictures } from '../models/pictures';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  // Picture Array Observable
  private picArray: Observable<Pictures[]>;

  constructor(private af: AngularFirestore) {
    // Bilder aus Firebase laden, nach timestamp DESC sortieren und in picArray speichern
    const pics = this.af.collection('Pictures', ref => {
      return ref.orderBy('timestamp', 'desc');
    }).valueChanges({ idField: 'id' });
    this.picArray = pics as Observable<Pictures[]>;
  }

  // PicArray ausgeben
  pictures() {
    return this.picArray;
  }

}
