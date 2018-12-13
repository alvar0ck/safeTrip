import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


 
const TOKEN_KEY = 'auth-token';

export interface ParentsLogin{

  id?: string;
  username: string;
  password: string;
  email: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  // validacion
  private parentsCollection: AngularFirestoreCollection<ParentsLogin>;
  private parentsList : Observable<ParentsLogin[]>;

  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, db: AngularFirestore) { 

    //Insert Login Parents
    this.parentsCollection = db.collection<ParentsLogin>('parentsList');
    this.parentsList = this.parentsCollection.snapshotChanges().pipe(
      map(actions =>{
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id,...data};
            
        });
      })
    );
    //Authentication Login
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }


  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    });
  }
 
  // login(username, password) {

  //   let tokenSecure = this.storage.set(TOKEN_KEY, 'tokenKey');
  //   return this.storage.set(TOKEN_KEY, 'ApiKey').then(res => {
  //   let user = this.parentsCollection.doc<ParentsLogin>(username).valueChanges();
  //   let pass = this.parentsCollection.doc<ParentsLogin>(password).valueChanges();

  //   for(let item in this.parentsList){
  //       if( this.parentsList[item].username == user && this.parentsList[item].password == pass){
  //         this.authenticationState.next(true);
  //       }
  //   }  
  //   });
  // }
 
  login(){
    return this.authenticationState.next(true);
  }


  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

  registerParents(parentlist: ParentsLogin){
    return this.parentsCollection.add(parentlist);
  }
 
}