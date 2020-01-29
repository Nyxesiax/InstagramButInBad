import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore/firestore.module';
import { Observable } from 'rxjs';
import { Pictures } from '../models/pictures';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  pictures: Observable<Pictures[]>;

  constructor(private af: AngularFirestore) {
    this.pictures = this.af.collection('Pictures').valueChanges() as Observable<Pictures[]>;
  }

}
