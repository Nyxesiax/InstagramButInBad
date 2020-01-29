import {Injectable} from '@angular/core';
import {Users} from '../modules/users';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Observable<any>;
  constructor(private httpClient: HttpClient, private af: AngularFirestore) {
    this.users = af.collection('Users').valueChanges({idField: 'id'});
  }

  get getUsers() {
    return this.users;
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
          alert("den gibts schon");
        }
      });

      return true;

    } catch (e) {
        return false;
      }
  }
}
