import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {mainListItems, subListItems} from './listScreens';
import TimerScreen from '../containers/timer/TimerScreen';
import DashboardScreen from '../containers/timer/DashboardScreen';
import ReportsScreen from '../containers/timer/ReportsScreen';
import InsightsScreen from '../containers/timer/InsightsScreen';
import SavedReportsScreen from '../containers/timer/SavedReportsScreen';
import ProjectsScreen from '../containers/timer/ProjectsScreen';
import ClientsScreen from '../containers/timer/ClientsScreen';
import TeamScreen from '../containers/timer/TeamScreen';
import WorkspacesScreen from '../containers/timer/WorkspacesScreen';
import TagsScreen from '../containers/timer/TagsScreen';
import HelpScreen from '../containers/timer/HelpScreen';
import UserProfileScreen from '../containers/timer/user/UserProfileScreen';
import UserSettingsScreen from '../containers/timer/user/UserSettingsScreen';

// MUI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AuthUserContext, withAuthentication } from './Session';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer +1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 8,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit *3,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
});

class Dashboard extends React.Component {

  state = {
    open: true,
    userPopperOpen: false,
  };

  handleOpenDrawer = () => {
    this.setState({ open: true });
  };

  handleCloseDrawer = () => {
    this.setState({ open: false });
  };

  handleTogglePopper = () => {
    this.setState({ userPopperOpen: !this.state.userPopperOpen});
  }

  handleClosePopper = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ userPopperOpen: false });
  }

  render () {

    const {classes, match, authUser} = this.props;
  
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open menu"
              onClick={this.handleOpenDrawer}
              className={classNames(classes.marginLeft, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h7" color="inherit" className={classes.grow}>What are you working on?</Typography>

            <Button color="inherit">
              <FolderOpenIcon />
            </Button>

            <Button color="inherit">
              <LocalOfferIcon />
            </Button>

            <Button color="inherit">
              <MonetizationOnIcon />
            </Button>

            <Button color="inherit">
              <Typography variant="h4" color="inherit" className={classes.grow}>00:00:00</Typography>
            </Button>

            <IconButton color="inherit">
              <PlayArrowIcon />
            </IconButton>

            <IconButton color="inherit">
              <StopIcon />
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              buttonRef={node => {
                this.anchorEl = node;
              }}
            >
             <Avatar src={authUser && authUser.photoURL} onClick={this.handleTogglePopper}/>
            </IconButton>
            <Popper open={this.state.userPopperOpen} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClosePopper}>
                      <MenuList>
                        <MenuItem component={Link} to={{pathname: "/timer/user/profile"}}>Profile</MenuItem>
                        <MenuItem component={Link} to={{pathname: "/timer/user/settings"}}>Settings</MenuItem>
                        <MenuItem onClick={this.handleClosePopper}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}> 
              <IconButton
                onClick={this.handleCloseDrawer}
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {mainListItems}
            </List>
            <Divider />
            <List>
              {subListItems}
            </List>
            <div>
              <Typography variant="subtitle1">{authUser && authUser.displayName}</Typography>
              <Typography variant="body2">Workspace</Typography>
            </div>
            
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path={`${match.path}/`} render={() => (<Redirect to={`${match.path}/app`}/> )}/>
              <Route exact path={`${match.path}/app`} component={TimerScreen} />
              <Route exact path={`${match.path}/dashboard`} component={DashboardScreen} />
              <Route exact path={`${match.path}/reports`} component={ReportsScreen} />
              <Route exact path={`${match.path}/insights`} component={InsightsScreen} />
              <Route exact path={`${match.path}/savedreports`} component={SavedReportsScreen} />
              <Route exact path={`${match.path}/projects`} component={ProjectsScreen} />
              <Route exact path={`${match.path}/clients`} component={ClientsScreen} />
              <Route exact path={`${match.path}/team`} component={TeamScreen} />
              <Route exact path={`${match.path}/workspaces`} component={WorkspacesScreen} />
              <Route exact path={`${match.path}/tags`} component={TagsScreen} />
              <Route exact path={`${match.path}/help`} component={HelpScreen} />
              <Route exact path={`${match.path}/user`} render={() => (<Redirect to={`${match.path}/user/profile`}/> )}/>
              <Route exact path={`${match.path}/user/profile`} component={UserProfileScreen} />
              <Route exact path={`${match.path}/user/settings`} component={UserSettingsScreen} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  };

};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuthentication(withStyles(styles) (Dashboard));