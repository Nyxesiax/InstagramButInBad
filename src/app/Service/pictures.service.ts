import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pictures } from '../models/pictures';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadImage } from '../models/upload-image';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  // Picture Array Observable
  private picArray: Observable<Pictures[]>;

  constructor(private af: AngularFirestore) {
    // Bilder aus Firebase laden, nach timestamp DESC sortieren und in picArray speichern
    let pics = this.af.collection('Pictures', ref => {
      return ref.orderBy('timestamp', 'desc');
    }).valueChanges({ idField: 'id' });
    this.picArray = pics as Observable<Pictures[]>;
  }

  // PicArray ausgeben
  pictures() {
    return this.picArray;
  }

  upload(uI: UploadImage) {
    this.af.collection('Pictures').add({
      Tags: uI.tags, URL: uI.url, description: uI.description, likes: uI.likes, timestamp: uI.timestamp
    })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
      });
  }

}
