const functions = require('firebase-functions');

const express = require("express");
const app = express();

const fbAuth = require('./firebase/fbAuth');

const { signup, login } = require('./handlers/users');

// Firebase Auth
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);