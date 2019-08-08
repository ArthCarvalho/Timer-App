import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
  },
  presentation: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 8}px`
  },
  homeTitle: {
    color: theme.palette.primary.contrastText,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  presentationButtons: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor:  theme.palette.common.white,
  },
  footerContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 8}px`
  },
});

const footerLinks = [
  {
    title: 'Timer App',
    items: [
      { label: 'Team', link: '/about/team' },
      { label: 'Jobs', link: '/jobs' },
      { label: 'Media Kit', link: '/mediakit' },
      { label: 'Contact Us', link: '/contact' },
      { label: 'API', link: '/api' },
      { label: 'Legal Terms', link: '/legal' },
    ], 
  },
  {
    title: 'Add-ons',
    items: [
      { label: 'Integrations', link: '/about/team' },
      { label: 'Timer App for Chrome', link: '/jobs' },
      { label: 'Timer App for Firefox', link: '/mediakit' },
      { label: 'Android App', link: '/contact' },
      { label: 'Desktop App', link: '/api' },
    ], 
  },
  {
    title: 'Useful Links',
    items: [
      { label: 'Timer App Blog', link: '/about/team' },
      { label: 'Support & Knowledge Base', link: '/jobs' },
    ], 
  },
  {
    title: 'Resources',
    items: [
      { label: 'Business Resources', link: '/about/team' },
      { label: 'Productivity Resources', link: '/jobs' },
      { label: 'Training Resources', link: '/mediakit' },
      { label: 'Out of Office - Remote Working Guide', link: '/contact' },
      { label: 'Time Card Calculator', link: '/api' },
    ], 
  },
];

function HomeScreen(props) {
  const { classes } = props;

  return(
    <React.Fragment>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap className={classes.toolbarTitle}>
            Timer App
          </Typography>
          <Button>Home</Button>
          <Button>About</Button>
          <Button>Sign out</Button>
          <Button color="primary" variant="outlined" component={RouterLink} to="/timer">Open timer</Button>
          <Button color="primary" variant="outlined" component={RouterLink} to="/signin">Sign in</Button>
          <Button color="primary" variant="outlined" component={RouterLink} to="/signup">Create account</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <div className={classes.presentation}>
          <Typography variant="h2" className={classes.homeTitle} align="center">
            Keep track of your work or training!
          </Typography>
          <Typography variant="h5" className={classes.homeTitle} align="center">
            Pick up your pace with Timer App and start getting a consistent training so you
            can avoid feeling like trash as you usually do for failing to train everyday,
            also you can progress and git gud.
          </Typography>
          <div className={classes.presentationButtons}>
            <Fab variant="extended" color="secondary" fullWidth component={RouterLink} to="/signup">Create an account<ArrowForwardIosIcon /></Fab>
          </div>
        </div>
        <div className={classes.heroUnit}>
          <div className={classes.presentation}>
            <Typography variant="h3" align="center">
              Why use Timer App?
            </Typography>
            <Typography variant="body" align="center">
              Because you know you're lazy, right?
            </Typography>
            <div className={classes.presentationButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button color="primary" variant="contained">Check it out</Button>
                </Grid>
                <Grid item>
                  <Button color="primary" variant="outlined">Also this</Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classes.heroUnit}>
          <div className={classes.presentation}>
            <Typography variant="h3" align="center">
              Why do you need this placeholder?
            </Typography>
            <Typography variant="body" align="center">
              Because at first sight it makes this page look like the real deal.
              <br/>
              It's not like I couldn't go without something like this, but I kind
              want this to look as good as possible from the onset.
              <br/>
              There is no specific reason for that, it just makes me feel good.
            </Typography>
          </div>
        </div>
      </main>
      <footer className={classes.footer}>
        <div className={classes.footerContent}>
          <Grid container spacing={32} justify="space-evenly">
          {footerLinks.map(footerSection => (
            <Grid item xs key={footerSection.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>{footerSection.title}</Typography>
            {footerSection.items.map(items =>(
              <Typography>
                <Link variant="subtitle1" color="textSecondary" key={items.label} component={RouterLink} to={items.link}>
                  {items.label}
                </Link>
              </Typography>
            ))}
            </Grid>
          ))}
          </Grid>
        </div>
      </footer>
    </React.Fragment>
  );
};

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);