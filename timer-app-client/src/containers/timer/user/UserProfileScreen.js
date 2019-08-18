import React, { Component, Fragment } from "react";

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
import InputLabel from "@material-ui/core/InputLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";

// Icons
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DoneIcon from "@material-ui/icons/Done";
import { OutlinedInput } from "@material-ui/core";

import { withAuthentication } from '../../../components/Session';

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
  const { classes, authUser } = props;
  const [values, setValues] = React.useState({
    displayName: '',
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  /*
  React.useEffect(() => {
    console.log(authUser);
  }, []);
  */
 
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
            >
              <DoneIcon />
              Done
            </ConfirmationButton>
          </div>
        </div>
        <div className={classes.basicData}>
          <div>
            <Avatar
              alt={authUser && authUser.displayName}
              src={authUser && authUser.photoURL}
              className={classes.bigAvatar}
            />
          </div>
          <div className={classes.nameEmail}>
            <div>
              <Typography variant="body1">Your name</Typography>
              <BroadTextField
                fullWidth
                variant="outlined"
                placeholder={authUser && authUser.displayName}
              />
            </div>
            <div>
              <Typography variant="body1">Email</Typography>
              <BroadTextField
                fullWidth
                variant="outlined"
                placeholder={authUser && authUser.email}
              />
            </div>
            <div>
              <Typography variant="body1">Country</Typography>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-country">{`Brazil`}</InputLabel>
                <Select
                  value={values.age}
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

export default withAuthentication(withStyles(styles)(UserProfileScreen));
