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

  upload(uI: UploadImage) {
    this.af.collection('Pictures').add({
      Tags: uI.tags, URL: uI.url, description: uI.description, likes: uI.likes, timestamp: uI.timestamp
    })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
      });
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
