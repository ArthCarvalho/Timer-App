import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

import {withFirebase} from '../../components/Firebase';
import { verifyPassword, verifyEmail } from '../../utils/validators';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit *3,
    marginRight: theme.spacing.unit *3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    backgroundColor: '#E9573F',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit *2}px ${theme.spacing.unit *3}px ${theme.spacing.unit *3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      loading: false
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fb = this.props.firebase;
    let errors = {};

    this.setState({ loading: true });

    // Check email
    let error = verifyEmail(this.state.email);
    if(error) {
      errors.email = error;
    }
    // Check password
    error = verifyPassword(this.state.password);
    if(error) {
      errors.password = error;
    }

    if(Object.keys(errors).length) {
      this.setState({ errors, loading: false });
      return;
    }

    fb.userLogin({ email: this.state.email, password: this.state.password })
    .then( () => {
      this.setState({ loading: false });
      this.props.history.push('/');
    })
    .catch( error => {
      console.error(error);
      this.setState({ errors: { ...this.state.errors, login: 'Email not found or wrong password.'}, loading: false });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clearErrors() {
    this.setState({ errors: undefined });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Fade in>
            <Avatar className={classes.avatar}><LockOutlinedIcon fontSize="large"/></Avatar>
          </Fade>
          <Fade in>
            <Typography component="h1" variant="h5">Sign In</Typography>
          </Fade>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Fade in style={{transitionDelay: '50ms'}}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
              </FormControl>
            </Fade>
            <Fade in style={{transitionDelay: '100ms'}}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" autoComplete="password" onChange={this.handleChange} />
              </FormControl>
            </Fade>
            <Fade in style={{transitionDelay: '150ms'}}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Fade>
            <Fade in style={{transitionDelay: '200ms'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                Sign in
              </Button>
            </Fade>
          </form>
        </Paper>
        
      </main>
    );
  };
};

export default  withFirebase(withStyles(styles)(SignInScreen));