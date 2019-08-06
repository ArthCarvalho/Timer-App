const { admin, db } = require('./admin');

module.exports = (request, response, next) => {
  let idToken;
  
  if(request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
    idToken = request.headers.authorization.split('Bearer ')[1];
  } else { 
    console.error('No token found.');
    return response.status(403).json({ error: "Unauthorized" });
  }

  admin.auth().verifyIdToken(idToken)
  .then(decodedToken => {
    request.user = decodedToken;
    return db.doc(`/users/${request.user.uid}`).get();
  })
  .then(doc => {
    request.user.displayName = doc.data().displayName;
    request.user.photoUrl = doc.data().photoUrl;
    request.user.settings = doc.data().settings;
    request.user.timeSettings = doc.data().timeSettings;
    return next();
  })
  .catch(error => {
    console.error('Error while verifying token', error);
    return response.status(403).json({ error: "Error while verifying token", error });
  });
};
