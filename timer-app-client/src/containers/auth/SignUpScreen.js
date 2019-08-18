import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import {withFirebase} from '../../components/Firebase';

import { verifyIfEmpty, verifyPassword, verifyEmail } from '../../utils/validators';

import { config } from '../../components/Firebase/config';

const toslabel = (
  <div>
    <span>I accept the </span>
    <Link component={RouterLink} to={'/terms'} color="secondary">terms of use</Link>
    <span> and </span>
    <Link component={RouterLink} to={'/privacy'} color="secondary">privacy policy</Link>
  </div>
);

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit *3,
    marginRight: theme.spacing.unit *3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  rowElement: {
    dispaly: 'flex',
    flexDirection: 'row',
  }
});

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      errors: {},
      loading: false
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fb = this.props.firebase;
    let errors = {};

    this.setState({ loading: true });

    // Check name
    if(verifyIfEmpty(this.state.displayName)){
      errors.displayName = 'Name cannot be empty.';
    }

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

    if(this.state.password !== this.state.confirmPassword) {
      errors.confirmPassword = 'Passwords must match.';
    }

    if(this.state.acceptTerms !== true) {
      errors.acceptTerms = 'You must accept the terms of use and privacy policy.';
    }

    if(Object.keys(errors).length) {
      this.setState({ errors, loading: false });
      return;
    }
    
    fb.userCreate({email: this.state.email, password: this.state.password, displayName: this.state.displayName})
    .then( () => {
      this.setState({ loading: false });
      this.props.history.push('/');
    })
    .catch( error => {
      console.error(error);
      if(error.code === 'auth/email-already-in-use') {
        this.setState({ errors: { ...this.state.errors, email: 'This email is already in use.'}, loading: false });
      }
    });
  };

  handleChange = (event) => {
    if(event.target.value === 'acceptTerms') {
      this.setState({
        acceptTerms: !this.state.acceptTerms
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  clearErrors() {
    this.setState({ errors: undefined });
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Fade in>
            <Avatar className={classes.avatar}><PersonIcon fontSize="large"/></Avatar>
          </Fade>
          <Fade in>
            <Typography component="h1" variant="h5">Create your account</Typography>
          </Fade>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.row}>
              <div>
                <Fade in style={{transitionDelay: '50ms'}}>
                  <FormControl margin="normal">
                    <InputLabel htmlFor="name" error={errors.displayName ? true : false}>Name</InputLabel>
                    <Input id="name" name="displayName" autoFocus onChange={this.handleChange} error={errors.displayName ? true : false}/>
                  </FormControl>
                </Fade>
              </div>
            </div>
            <Fade in style={{transitionDelay: '100ms'}}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email" error={errors.email ? true : false}>Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} error={errors.email ? true : false} />
              </FormControl>
            </Fade>
            <Fade in style={{transitionDelay: '150ms'}}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password" error={errors.password ? true : false}>Password</InputLabel>
                <Input id="password" name="password" autoComplete="password" onChange={this.handleChange} error={errors.password ? true : false}/>
              </FormControl>
            </Fade>
            <Fade in style={{transitionDelay: '200ms'}}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password" error={errors.password || errors.confirmPassword ? true : false}>Confirm Password</InputLabel>
                <Input id="confirmPassword" name="confirmPassword" autoComplete="password" onChange={this.handleChange} error={errors.password || errors.confirmPassword ? true : false}/>
              </FormControl>
            </Fade>
            <Fade in style={{transitionDelay: '250ms'}}>
              <FormControlLabel
                control={<Checkbox value="acceptTerms" color="primary" />}
                label={toslabel}
                onChange={this.handleChange}
              />
            </Fade>
            <Fade in style={{transitionDelay: '300ms'}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              Create account
            </Button>
            </Fade>
          </form>
        </Paper>      
      </main>
    );
  };
};

export default withFirebase(withStyles(styles)(SignUpScreen));