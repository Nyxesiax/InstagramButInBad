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
      this.af.collection('Users').add({
        'email': email,
        'password': password,
        'username': username
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
