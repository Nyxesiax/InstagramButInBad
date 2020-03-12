import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pictures } from '../models/pictures';
import {AngularFirestore} from '@angular/fire/firestore';
import { UploadImage } from '../models/upload-image';
import {Post} from '../models/post';
import {PostService} from './post.service';
import {DetailWindowService} from './detail-window.service';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  // Picture Array Observable
  private picArray: Observable<Post[]>;
  private singlePicArray: Observable<Pictures[]>;

  constructor(private af: AngularFirestore, public postService: PostService, public detailwindowService: DetailWindowService) {
    // Bilder aus Firebase laden, nach timestamp DESC sortieren und in picArray speichern
    const pics = this.af.collection('posts', ref => {
      return ref.orderBy('picture.timestamp', 'desc');
    }).valueChanges({ idField: 'id' });
    this.picArray = pics as any as Observable<Post[]>;
  }

  // PicArray ausgeben
  pictures() {
    console.table(this.picArray);
    console.log(this.picArray);
    return this.picArray;
  }


  singlePicByID() {
    return this.singlePicArray;
  }

  upload(uI: UploadImage) {
    this.af.collection('Pictures').add({
      tags: uI.tags, URL: uI.url, description: uI.description, likes: uI.likes, timestamp: uI.timestamp
    })
      .then(docRef => {
        this.postService.createPost(docRef.id, uI.url, uI.description, uI.likes);
        console.log('Document written with ID: ', docRef.id);
      });
  }

  async like(): Promise<boolean> {
    try {
      this.af.collection('posts')
        .valueChanges({likes: 'likes', idField: 'id'});
      return true;
    } catch (e) {
      return false;
    }
  }

  async updatePicture(pic: Post) {
    this.af.collection('posts').doc(pic.id).update({
      URL: pic.picture.URL,
      likes: pic.picture.likes
    });
  }

  async showSinglePicture(pic: Pictures) {
    const picture = this.af.collection('posts').doc(pic.id);
    // this.singlePicArray = picture as Observable<Pictures[]>;
  }
}
