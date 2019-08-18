import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

import HomeScreen from './containers/landing/HomeScreen';
import Dashboard from './components/Dashboard';
import SignInScreen from './containers/auth/SignInScreen';
import SignUpScreen from './containers/auth/SignUpScreen';

import { withFirebase } from './components/Firebase';
import { AuthUserContext } from './components/Session';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.authListener = this.props.firebase.auth.onAuthStateChanged( authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={muiTheme}>
          <AuthUserContext.Provider value={this.state.authUser}>
          <BrowserRouter>
            <Switch>
              <Route path="/timer" component={Dashboard}/>
              <Route path="/signin" component={SignInScreen}/>
              <Route path="/signup" component={SignUpScreen}/>
              <Route
                path="/"
                component={HomeScreen}
              />
            </Switch>
          </BrowserRouter>
          </AuthUserContext.Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withFirebase(App);
