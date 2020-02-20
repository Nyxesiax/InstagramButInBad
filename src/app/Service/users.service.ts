import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users: Observable<any>;
  currentUser: string;

  constructor(private httpClient: HttpClient, private af: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.users = af.collection('Users').valueChanges({ idField: 'id' });
  }
  getUsers() {
    return this.currentUser;
  }

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
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!' + JSON.stringify(result));
        this.currentUser = result.user.displayName;
        this.router.navigateByUrl('/dashboard');
      }).catch((error) => {
        console.log(error);
      });
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
    });
  }
}
