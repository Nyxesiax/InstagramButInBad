import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, public router: Router, public userbla: Users) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
        alert('You have successfully signed up!');
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    console.log('email: ' + email);
    console.log('pass: ' + password);
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userbla.email = res.user.email;
        alert(this.userbla.email);
        console.log('You are Successfully logged in!');
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doRegister(value) {
    console.log('email: ' + value.email);
    return new Promise<any>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    console.log('value email: ' + value.email);
    console.log('value pass: ' + value.password);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.userbla.email = res.user.email;
          resolve(res);
        }, err => reject(err));
    });
  }

  SignOut() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.angularFireAuth.auth.signOut();
        this.router.navigateByUrl('');
        resolve();
      } else {
        try {
          return this.angularFireAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('');
          });
        } catch (e) {
          reject();
        }
      }
    });
  }

}
