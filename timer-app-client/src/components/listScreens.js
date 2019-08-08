import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimerIcon from '@material-ui/icons/Timer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StarsIcon from '@material-ui/icons/Stars';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HelpIcon from '@material-ui/icons/Help';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const parentUrl = '/timer';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to={parentUrl+'/app'}> 
      <ListItemIcon>
        <TimerIcon />
      </ListItemIcon>
      <ListItemText primary="Timer"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/dashboard'}> 
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/reports'}> 
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/insights'}> 
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Insights"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/savedreports'}> 
      <ListItemIcon>
        <StarsIcon />
      </ListItemIcon>
      <ListItemText primary="Saved Reports"/>
    </ListItem>
  </div>
);

export const subListItems = (
  <div>
    <ListItem button component={Link} to={parentUrl+'/projects'}> 
      <ListItemIcon>
        <FolderOpenIcon />
      </ListItemIcon>
      <ListItemText primary="Projects"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/clients'}> 
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Clients"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/team'}> 
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Team"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/workspaces'}> 
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Workspaces"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/tags'}> 
      <ListItemIcon>
        <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="Tags"/>
    </ListItem>
    <ListItem button component={Link} to={parentUrl+'/help'}>  
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help"/>
    </ListItem>
    <ListItem button>  
      <ListItemIcon>
        <ExpandMoreIcon />
      </ListItemIcon>
      <ListItemText primary="Show more"/>
    </ListItem>
  </div>
);