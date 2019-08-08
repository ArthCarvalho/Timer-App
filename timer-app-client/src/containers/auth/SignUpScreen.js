import React from 'react';
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

function SignUpScreen(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Fade in>
          <Avatar className={classes.avatar}><PersonIcon fontSize="large"/></Avatar>
        </Fade>
        <Fade in>
          <Typography component="h1" variant="h5">Create your account</Typography>
        </Fade>
        <form className={classes.form}>
          <div className={classes.row}>
            <div>
              <Fade in style={{transitionDelay: '50ms'}}>
                <FormControl margin="normal">
                  <InputLabel htmlFor="name">First Name</InputLabel>
                  <Input id="name" name="name" autoFocus/>
                </FormControl>
              </Fade>
            </div>
            <div>
              <Fade in style={{transitionDelay: '50ms'}}>
                <FormControl margin="normal">
                  <InputLabel htmlFor="name">Last Name</InputLabel>
                  <Input id="name" name="name" />
                </FormControl>
              </Fade>
            </div>
          </div>
          <Fade in style={{transitionDelay: '100ms'}}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" />
            </FormControl>
          </Fade>
          <Fade in style={{transitionDelay: '150ms'}}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" name="password" autoComplete="password" />
            </FormControl>
          </Fade>
          <Fade in style={{transitionDelay: '200ms'}}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input id="password" name="password" autoComplete="password" />
            </FormControl>
          </Fade>
          <Fade in style={{transitionDelay: '250ms'}}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={toslabel}
            />
          </Fade>
          <Fade in style={{transitionDelay: '300ms'}}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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

export default withStyles(styles)(SignUpScreen);