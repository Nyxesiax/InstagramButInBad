import * as firebase from 'firebase';
import {Users} from '../models/users';
import {auth} from 'firebase';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // tslint:disable-next-line:max-line-length
  constructor(public angularFireAuth: AngularFireAuth, public router: Router, public userbla: Users) {
    this.userData = angularFireAuth.authState;

    /* Saving user data as an object in localstorage if logged out than set to null */
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userDataTwo = user; // Setting up user data in userData var
        localStorage.setItem('user', JSON.stringify(this.userDataTwo));
        this.userDataThree = JSON.parse(localStorage.getItem('user'));
        this.userbla.email = JSON.parse(JSON.stringify(this.userDataThree.email));
        this.userbla.userProfile = JSON.parse(JSON.stringify(this.userDataThree.photoURL));
      } else {
        localStorage.clear();
      }
    });
  }

  userDataThree: firebase.User;
  userDataTwo: any;
  userData: Observable<firebase.User>;
 /*
  isLoggedIn = false;



  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  } */

  /* Sign up */
  signUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
        alert('You have successfully signed up!');
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        localStorage.clear();
      });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    console.log('email: ' + email);
    console.log('pass: ' + password);
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userbla.email = res.user.email;
        console.log('You are Successfully logged in!');
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
        localStorage.clear();
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
          localStorage.clear();
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
          console.log('You are: ' + JSON.stringify(res));
          this.userbla.email = res.user.email;
          resolve(res);
        }, err => reject(err)), localStorage.clear();
    });
  }

  async signOut() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.angularFireAuth.auth.signOut();
        localStorage.clear();
        this.router.navigateByUrl('');
        resolve();
      } else {
        try {
          return this.angularFireAuth.auth.signOut().then(() => {
           // localStorage.removeItem('user');
          //  localStorage.removeItem('post');
            localStorage.clear();
          });
        } catch (e) {
          localStorage.clear();
          reject();
        }
      }
    });
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!' + JSON.stringify(result));
        this.userbla.email = result.user.email;
        this.userbla.userProfile = result.user.photoURL;
        this.router.navigateByUrl('/dashboard');
      }).catch((error) => {
        localStorage.clear();
        console.log(error);
      });
  }

  isAuthenticated(): boolean {
    if (firebase.auth().currentUser) {
      return true;
    } else {
      return false;
    }
  }

  // Success!
  uploadImageToStorage(file) {
    let photoURL = null;
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref('Profilbilder/' + firebase.auth().currentUser.uid + '/' + file.name);
      storageRef.put(file).then(() => {
        storageRef.getDownloadURL().then((url) => {
          photoURL = url;
          firebase.auth().currentUser.updateProfile({
              photoURL: photoURL.toString()
            }
          );
        });
      });
      resolve();
    });
  }

  reset() {
    firebase.auth().currentUser.updateProfile({
      photoURL: null
    });
  }
}
