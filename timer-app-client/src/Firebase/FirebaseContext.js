import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Constumer>
    { firebase => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Constumer>
);

export default FirebaseContext;