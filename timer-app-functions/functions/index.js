const functions = require('firebase-functions');

const express = require("express");
const app = express();

const fbAuth = require('./firebase/fbAuth');

const { signup, login, logout } = require('./handlers/users');
const { getTimerSingleEntry, getTimerEntries } = require('./handlers/timer');

// Firebase Auth
app.post("/signup", signup);
app.post("/login", login);

// Timer Entries

// Get single timer entry
// Params:
// /:id - entry document ID
app.get("/timer/entry/:id", fbAuth, getTimerSingleEntry);
// Get a list of timer entries
// Query:
// ?limit - Maximum number of entries to return (default: 10)
// ?workspace - Filter by workspace id
// ?project - Filter by project id
// ?before - Get entries only from before specified date
// ?after - Get entries only from after specified date
app.get("/timer/entries", fbAuth, getTimerEntries);

exports.api = functions.https.onRequest(app);
