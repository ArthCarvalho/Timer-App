import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { config } from './config';

class Firebase {
  constructor() {
    this.app = app.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.database();
    this.user = {
      displayName: '',
      photoURL: '',
      cred: null
    };
  }

  userCreate = (data) => {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then( data => {
      let newUser = this.auth.currentUser;
      newUser.updateProfile({
        displayName: data.displayName,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/user-images%2Fno-img.png?alt=media`
      });
    });
  }

  userLogin = (data) => {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  userLogout = () => {
    this.auth.signOut();
  }

}

export default Firebase;