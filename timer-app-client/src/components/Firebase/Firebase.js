import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { config } from './config';

class Firebase {
  constructor() {
    this.app = app.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.database();
    this.storage = this.app.storage();
    this.user = {
      displayName: '',
      photoURL: '',
      cred: null
    };
  }

  onProfileUpdated;

  profileUpdated = (profileData) => {
    if(!this.onProfileUpdated) return;
    this.onProfileUpdated(profileData);
  }

  updateProfilePicture = (name) => {
    let fullURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/user-images%2F${name}?alt=media`;
    return this.auth.currentUser.updateProfile({
      photoURL: fullURL
    })
    .then(() => {
      return fullURL;
    });
  }

  userCreate = (data) => {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then( authdata => {
      let newUser = this.auth.currentUser;
      newUser.updateProfile({
        displayName: data.displayName,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/user-images%2Fno-img.png?alt=media`
      });
      return authdata;
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