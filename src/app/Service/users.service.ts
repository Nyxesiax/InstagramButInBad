import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Users} from '../models/users';
import {Post} from '../models/post';
import * as firebase from 'firebase';
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  posts: Observable<Post[]>;
  userData: Observable<firebase.User>;

  // tslint:disable-next-line:max-line-length
  constructor(private af: AngularFirestore, public angularFireAuth: AngularFireAuth, public router: Router, public user: Users) {
  }
/*
  del(user: Users) {
    this.af.collection('Users').doc(user.id).delete();
  }

  async save(email: string, password: string, username: string): Promise<boolean> {
    try {
      const ref = this.af.collection('Users').ref;


      ref.where('email', '==', email).get().then(d => {
        alert(JSON.stringify(d));
        if (d) {
          this.af.collection('Users').add({
            'email': email,
            'password': password,
            'username': username
          });
        } else {
          alert('den gibts schon');
        }
      });
      await this.router.navigate(['/login']);
      return true;

    } catch (e) {
        return false;
      }
  } */
  loadPostsOfLoggedinOwner() {
    const postOfOwner = this.af.collection('posts', ref => {
      return ref.where('owner', '==', this.user.email);
    }).valueChanges({ idField: 'id' });
    this.posts = postOfOwner as any as Observable<Post[]>;
  }

  async switchToUserProfile() {
   await this.router.navigateByUrl('/userProfile');
  }

  ownerPosts() {
    this.loadPostsOfLoggedinOwner();
    return this.posts;
  }
}
