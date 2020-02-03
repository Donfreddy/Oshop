import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    const promise =  this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
    promise
  .then(_ => console.log('success'))
  .catch(err => console.log(err, 'You dont have access!'));
  }

  get(uid: string): Observable<any> { 
    return this.db.object('/users/' + uid).valueChanges();
  }
}
