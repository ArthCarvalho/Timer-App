const { db } = require('../firebase/admin');

const { config } = require('../config');

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../utils/validators');

// Signup
exports.signup = (request, response) => {
  const newUser = {
    displayName: request.body.displayName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    country: request.body.country
  };

  const { errors, valid } = validateSignupData(newUser);

  if (!valid) return response.status(400).json(errors);

  const defaultImg = "no-img.png";

  let uid, token;

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      uid = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userData = {
        displayName: newUser.displayName,
        email: newUser.email,
        country: newUser.country,
        photoUrl: defaultImg,
        defaultWorkspace: "",
        settings: [
          "warnLongRunningTimers",
          "groupSimilarEntries",
          "showTimerOnTitleBar"
        ],
        timeSettings: {
          dateFormat: "MM/DD/YY",
          firstDayOfWeek: "Monday",
          timeZone: "UTC-3",
          timeFormat: "12hour"
        },
        createdAt: new Date().toISOString()
      };
      return db.doc(`/users/${uid}`).set(userData);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch(error => {
      return response
        .status(400)
        .json({ error: error.code, message: error.message });
    });
};

// Login
exports.login = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  };

  let refreshToken;
  const { errors, valid } = validateLoginData(user);

  if (!valid) return response.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      refreshToken = data.user.refreshToken;
      return data.user.getIdToken();
    })
    .then(token => {
      return response.json({ token, refreshToken });
    })
    .catch(error => {
      console.error(error);
      if(error.code === 'auth/wrong-password'){
        return response.status(403).json({ general: 'Wrong credentials, please try again'});
      } else return response.status(500).json({ error: error.code, message: error.message });
    });
};
