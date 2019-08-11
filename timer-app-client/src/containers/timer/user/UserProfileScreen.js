import React, { Component, Fragment } from "react";

// MUI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { green } from '@material-ui/core/colors';

// Icons
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DoneIcon from "@material-ui/icons/Done";
import { OutlinedInput } from "@material-ui/core";

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
    width: "80%",
    '& div': { marginBottom: 8}, //Breaks the correct size of the Select
  },
  nameEmailPapers: {
    paddingLeft: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    marginBottom: "25px"
  },
  optionsCheckboxes: {
    display: "flex",
    flexDirection: "column"
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
  },

  optionPapers: {
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "200px"
  }
});

const ConfirmationButton = withStyles( theme => ({
  root: { 
    color: 'white',
    textTransform:'none',
    backgroundColor: "#4bc800",
    '&:hover': {
      backgroundColor: "#47be00",
    },
  },
}))(Button);

const UserProfileScreen = props => {
  const { classes } = props;
  const [values, setValues] = React.useState({
    age: "",
    name: "hai"
  });

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

  return (
    <Fragment>
      <form className={classes.root} autocomplete="off">
        <div className={classes.headerItems}>
          <Typography variant="h4" className={classes.topText}>
            My Profile
          </Typography>
          <div className={classes.topIcons}>
            <Button>
              <SettingsIcon />
              <ArrowDropDownIcon />
            </Button>
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
              alt={`Username`}
              src="https://firebasestorage.googleapis.com/v0/b/timer-app-project.appspot.com/o/no-img.png?alt=media&token=74ca4d0e-26e1-4b1b-a5d5-f70af6028e85"
              className={classes.bigAvatar}
            />
          </div>
          <div className={classes.nameEmail}>
            <div>
              <Typography variant="body1">Your name</Typography>
              {/* <Paper className={classes.nameEmailPapers}> */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`Arthur Carvalho`}
              />
              {/* </Paper> */}
            </div>
            <div>
              <Typography variant="body1">Email</Typography>
              {/* <Paper className={classes.nameEmailPapers}> */}
              {/* <Typography variant="body1"> */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`carvalho.yoa.arthur@gmail.com`}
              />
              {/* </Typography> */}
              {/* </Paper> */}
            </div>
            <div>
              <Typography variant="body1">Country</Typography>
              
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                
                <InputLabel htmlFor="outlined-age-simple">
                  {`Brazil`}
                </InputLabel>
                <Select
                  value={values.age}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth='100'
                      name="age"
                      id="outlined-age-simple"
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
                  <Paper className={classes.optionPapers}>
                    <Typography variant="body1">{`America/São Paulo(UTC -3)`}</Typography>
                  </Paper>
                </div>
                <div>
                  <Typography variant="subtitle2">
                    {`Duration display format`}
                  </Typography>
                  <Paper className={classes.optionPapers}>
                    <Typography variant="body1">{`Classic (47:06 min)`}</Typography>
                  </Paper>
                </div>
              </div>
              <div className={classes.bottomTimeOptions}>
                <div>
                  <Typography variant="subtitle2">{`Date format`}</Typography>
                  <Paper className={classes.optionPapers}>
                    <Typography variant="body1">{`DD-MM-YYYY`}</Typography>
                  </Paper>
                </div>
                <div>
                  <Typography variant="subtitle2">{`Time format`}</Typography>
                  <Paper className={classes.optionPapers}>
                    <Typography variant="body1">{`12-hour`}</Typography>
                  </Paper>
                </div>
                <div>
                  <Typography variant="subtitle2">
                    {`First day of the Week`}
                  </Typography>
                  <Paper className={classes.optionPapers}>
                    <Typography variant="body1">{`Monday`}</Typography>
                  </Paper>
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
