import React, { Fragment, useContext } from "react";

import moment from 'moment';

// MUI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";

// Icons
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DoneIcon from "@material-ui/icons/Done";
import { OutlinedInput } from "@material-ui/core";

import { AuthUserContext, withAuthentication } from '../../../components/Session';
import { FirebaseContext } from '../../../components/Firebase';

const styles = theme => ({
  headerItems: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "80px"
  },

  topIcons: {
    "& Button": { marginRight: "20px" }
  },

  topText: {
    marginLeft: 22
  },
  bigAvatar: {
    marginLeft: 10,
    marginTop: 18,
    width: 180,
    height: 180
  },
  basicData: {
    display: "flex"
  },
  nameEmail: {
    marginLeft: 20,
    width: "80%"
  },
  optionsCheckboxes: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px"
  },
  timerPageOptions: {
    marginTop: "20px",
    marginBottom: "30px"
  },

  timeOptions: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    marginBottom: "35px"
  },

  topTimeOptions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px"
  },
  bottomTimeOptions: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const ConfirmationButton = withStyles(theme => ({
  root: {
    color: "white",
    textTransform: "none",
    backgroundColor: "#4bc800",
    "&:hover": {
      backgroundColor: "#47be00"
    }
  }
}))(Button);

const BroadTextField = withStyles(theme => ({
  root: { marginBottom: "20px" }
}))(TextField);

const AdjustedOutlinedInput = withStyles(theme => ({
  root: {
    width: "250px"
  }
}))(OutlinedInput);

const UserProfileScreen = props => {
  const { classes } = props;

  const authContext = useContext(AuthUserContext);
  const firebaseContext = useContext(FirebaseContext);

  const [profileChanged, setProfileChanged] = React.useState(false);

  const [values, setValues] = React.useState({
    displayName: '',
    photoURL: '',
    email: '',
    country: ''
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    
    if(!profileChanged) return;

    firebaseContext.auth.currentUser.updateProfile({
      displayName: values.displayName,
      photoURL: values.photoURL
    })
    .then(() => {
      //verify if there are changes to the email field
      if(values.email !== authContext.email) {
        return firebaseContext.currentUser.updateEmail(values.email);
      }
    })
    .then(() => {
      console.log('profile updated successfully.');

      let changeData = {};

      Object.assign(changeData, authContext);

      changeData.displayName = values.displayName;
      changeData.photoURL = values.photoURL;

      firebaseContext.profileUpdated(changeData);
    });

    


    // Reset profile status to not edited
    setProfileChanged(false);
  }


  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChangeText = ( name, value )=> {
    setValues({ ...values, [name]: value });
  }

  React.useEffect(() => {
    if(!authContext) return;
    setValues({
      displayName: authContext.displayName,
      photoURL: authContext.photoURL,
      email: authContext.email
    });
  }, [authContext]);

  React.useEffect(() => {
    if(!authContext) return;
    let changes = 0;
    if(values.displayName !== authContext.displayName) changes++; 
    if(values.email !== authContext.email) changes++; 
    if(values.photoURL !== authContext.photoURL) changes++; 
    if(changes) {
      setProfileChanged(true);
      console.log('profile modified', changes);
    } else {
      setProfileChanged(false);
    }
  }, [values]);

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off">
        <div className={classes.headerItems}>
          <Typography variant="h4" className={classes.topText}>
            My Profile
          </Typography>
          <div className={classes.topIcons}>
              <Button onClick={handleClick}>
                <SettingsIcon />
                <ArrowDropDownIcon />
              </Button>
                <Menu
                  id='settings-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                    <MenuItem>{"None"}</MenuItem>
                    <MenuItem>{"None"}</MenuItem>
                    <MenuItem>{"None"}</MenuItem>
                    <MenuItem>{"None"}</MenuItem>
                </Menu>
            <ConfirmationButton
              className={classes.confirmationButton}
              variant="contained"
              color="primary"
              disabled={!profileChanged}
              onClick={handleSaveChanges}
            >
              <DoneIcon />
              Save Changes
            </ConfirmationButton>
          </div>
        </div>
        <div className={classes.basicData}>
          <div>
            <Avatar
              alt={values.displayName}
              src={values.photoURL}
              className={classes.bigAvatar}
            />
            <Input type="file" id="imageInput" onChange={(e) => {
              // Handle image changes
              const date = moment().format("YYYYMMDD-HHMMSS");
              const image = e.target.files[0];
              const store = firebaseContext.storage.ref();
              const imageExtension = `.${e.target.files[0].name.split('.').pop()}`
              const imageName = `user-images/${authContext.uid}/${date}${imageExtension}`;
              const userPhoto = store.child(imageName).put(image)
              .then( snapshot => {
                console.log('snapshot.name:',snapshot.metadata.fullPath);
                firebaseContext.updateProfilePicture(snapshot.metadata.fullPath)
                .then((fullURL) => {
                  const oldImage = values.photoURL.split('/o/').pop().split('?')[0].replace(/%2F/g,'/');
                  if(oldImage !== 'user-images/no-img.png'){
                    store.child(oldImage).delete();
                  }
                  setValues({...values, photoURL: fullURL});
                });
                
              });
              

            }}></Input>
          </div>
          <div className={classes.nameEmail}>
            <div>
              <Typography variant="body1">Your name</Typography>
              <BroadTextField
                fullWidth
                variant="outlined"
                value={values.displayName}
                onChange={(e) => setValues({...values, displayName: e.target.value})}
              />
            </div>
            <div>
              <Typography variant="body1">Email</Typography>
              <BroadTextField
                fullWidth
                variant="outlined"
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
              />
            </div>
            <div>
              <Typography variant="body1">Country</Typography>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-country">{`Brazil`}</InputLabel>
                <Select
                  value={values.country}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      fullWidth
                      name="country"
                      id="outlined-country"
                    />
                  }
                >
                  <MenuItem value="">
                    <em>Choose your country of residence</em>
                  </MenuItem>
                  <MenuItem value={10}>Niue</MenuItem>
                  <MenuItem value={20}>United States</MenuItem>
                  <MenuItem value={30}>Canada</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.optionsCheckboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange("checkedB")}
                    value="checkedB"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
                label="Send weekly time entry updates"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleChange("checkedC")}
                    value="checkedC"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
                label="Email me about long-running (over 8 hours) timer"
              />
              <div className={classes.timerPageOptions}>
                <Typography variant="h6">{`Timer Page`}</Typography>
                <Typography variant="body2">
                  <div className={classes.optionsCheckboxes}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedD}
                          onChange={handleChange("checkedD")}
                          value="checkedD"
                          inputProps={{
                            "aria-label": "primary checkbox"
                          }}
                        />
                      }
                      label="Group similar time entries"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedE}
                          onChange={handleChange("checkedE")}
                          value="checkedE"
                          inputProps={{
                            "aria-label": "primary checkbox"
                          }}
                        />
                      }
                      label="Show running time on the title bar"
                    />
                  </div>
                </Typography>
              </div>
            </div>
            <Divider />
            <div className={classes.timeOptions}>
              <div className={classes.topTimeOptions}>
                <div>
                  <Typography variant="subtitle2">{`Time Zone`}</Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-timezone">
                      {`America/São Paulo(UTC -3)`}
                    </InputLabel>
                    <Select
                      value={values.age}
                      onChange={handleChange}
                      input={
                        <AdjustedOutlinedInput
                          name="timezone"
                          id="outlined-timezone"
                        />
                      }
                    >
                      <MenuItem value={10}>None</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                      <MenuItem value={30}>None</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Typography variant="subtitle2">
                    {`Duration display format`}
                  </Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-duration-display-format">
                      {`Classic (47:06 min)`}
                    </InputLabel>
                    <Select
                      value={values.age}
                      onChange={handleChange}
                      input={
                        <AdjustedOutlinedInput
                          name="duration-display-format"
                          id="outlined-duration-display-format"
                        />
                      }
                    >
                      <MenuItem value={10}>None</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                      <MenuItem value={30}>None</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className={classes.bottomTimeOptions}>
                <div>
                  <Typography variant="subtitle2">{`Date format`}</Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-date-format">
                      {`DD-MM-YYYY`}
                    </InputLabel>
                    <Select
                      value={values.age}
                      onChange={handleChange}
                      input={
                        <AdjustedOutlinedInput
                          name="date-format"
                          id="outlined-date-format"
                        />
                      }
                    >
                      <MenuItem value={10}>None</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                      <MenuItem value={30}>None</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Typography variant="subtitle2">{`Time format`}</Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-time-format">
                      {`12-hour`}
                    </InputLabel>
                    <Select
                      value={values.age}
                      onChange={handleChange}
                      input={
                        <AdjustedOutlinedInput
                          name="time-format"
                          id="outlined-time-format"
                        />
                      }
                    >
                      <MenuItem value={10}>None</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                      <MenuItem value={30}>None</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Typography variant="subtitle2">
                    {`First day of the Week`}
                  </Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="first-day-of-the-week">
                      {`Monday`}
                    </InputLabel>
                    <Select
                      value={values.age}
                      onChange={handleChange}
                      input={
                        <AdjustedOutlinedInput
                          name="first-day-of-the-week"
                          id="outlined-first-day-of-the-week"
                        />
                      }
                    >
                      <MenuItem value={10}>None</MenuItem>
                      <MenuItem value={20}>None</MenuItem>
                      <MenuItem value={30}>None</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default withStyles(styles)(UserProfileScreen);
