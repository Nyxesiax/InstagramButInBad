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
  private singlePicArray: Observable<Pictures[]>;

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

  singlePicByID() {
    return this.singlePicArray;
  }

  async like(): Promise<boolean> {
    try {
      this.af.collection('Pictures').valueChanges({likes: 'likes'});
      return true;
    } catch (e) {
      return false;
    }
  }

  async updatePicture(pic: Pictures) {
    this.af.collection('Pictures').doc(pic.id).update({
      URL: pic.URL,
      likes: pic.likes
    });
  }

  async showSinglePicture(pic: Pictures) {
    const picture = this.af.collection('Pictures').doc(pic.id);
    // this.singlePicArray = picture as Observable<Pictures[]>;
  }

}
