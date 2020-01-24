import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore/firestore.module';
import { Observable } from 'rxjs';
import { Pictures } from '../models/pictures';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  _pictures: Observable<Pictures[]>;

  constructor(private af: AngularFirestore) {  }

  getUrl() {
    const pictures = this.af.collection('URL').valueChanges();
    this._pictures = pictures as Observable<Pictures[]>;
  }

  pictures() {
    return this._pictures;
  }
}