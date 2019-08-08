import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

// import HomeScreen from './components/screens/landing/HomeScreen';
import Dashboard from './components/Dashboard';
// import SignInScreen from './components/screens/auth/SignInScreen';
// import SignUpScreen from './components/screens/auth/SignUpScreen';

function App() {
  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <Switch>
            <Route path="/timer" component={Dashboard}/>
            {/* <Route path="/signin" component={SignInScreen}/> */}
            {/* <Route path="/signup" component={SignUpScreen}/> */}
            <Route
              path="/"
              // component={HomeScreen}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
