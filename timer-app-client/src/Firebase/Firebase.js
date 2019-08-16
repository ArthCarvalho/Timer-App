import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import config from './config';

class Firebase {
  constructor() {
    this.app = app.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.database();
  }
}

export default Firebase;