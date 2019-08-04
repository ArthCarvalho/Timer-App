const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const express = require('express');
const app = express();

const { config } = require('./config');

const firebase = require('firebase');
firebase.initializeApp(config);

// Utility Functions
// Validators
const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
};

validateSignupData = (data) => {
  let errors = {};

  if(isEmpty(data.displayName)){
    errors.displayName = 'Must not be empty';
  }

  if(isEmpty(data.country)){
    errors.country = 'Must not be empty';
  }

  if(isEmpty(data.email)){
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)){
    errors.email = 'Must be a valid email address'
  }

  if(isEmpty(data.password)){
    errors.password = 'Must not be empty';
  }
  if(data.password !== data.confirmPassword){
    errors.confirmPassword = 'Passwords must match';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Handler: User Functions
const signup = (request, response) => {
  const newUser = {
    displayName: request.body.displayName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    country: request.body.country,
  };

  const {errors, valid} = validateSignupData(newUser);

  if(!valid) return response.status(400).json(errors);

  const defaultImg = "no-img.png";

  let uid, token;

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
  .then( data => {
    uid = data.user.uid;
    return data.user.getIdToken();
  })
  .then( idToken => {
    token = idToken;
    const userData = {
      displayName: newUser.displayName,
      email: newUser.email,
      country: newUser.country,
      photoUrl: defaultImg,
      defaultWorkspace: '',
      settings: [
        'warnLongRunningTimers',
        'groupSimilarEntries',
        'showTimerOnTitleBar'
      ],
      timeSettings: {
        dateFormat: 'MM/DD/YY',
        firstDayOfWeek: 'Monday',
        timeZone: 'UTC-3',
        timeFormat: '12hour'
      },
      createdAt: new Date().toISOString()
    };
    return db.doc(`/users/${uid}`).set(userData);
  })
  .then(() => {
    return response.status(201).json({ token });
  })
  .catch(error => {
    return response.status(400).json({error: error.code, message: error.message});
  });
 };

app.post('/signup', signup);

exports.api = functions.https.onRequest(app);