import React from "react";
import { Link as RouterLink } from "react-router-dom";

//MUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

//Icons
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MoreIcon from "@material-ui/icons/MoreVert";
import ListIcon from "@material-ui/icons/List";
import FolderIcon from "@material-ui/icons/Folder";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const styles = theme => ({
  palette: {
    primary: 'black',
    secondary: '#727272',
  },
  
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    "&:hover $entryButton": {
      opacity: 1
    }
  },
  grow: {
    flexGrow: 1,
    display: "flex"
  },
  selectionCounter: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: "#727272"
  },
  entryButton: {
    opacity: 0
  },
  entryBeginEnd: {
    marginRight: "20px",
    color: "#727272"
  },
  entryElapsedTime: {
    color: "automatic",
    fontWeight: "bold"
  },
  entryDescription: {
    color: "#727272"
  },
  entryAttributes: {
    marginRight: "20px",
    color: "#727272"
  },
  entryActions: {
    marginLeft: "20px",
    color: "#727272"
  },
  totalTime: {
    fontSize: "25px",
    marginRight: "84px"
  }
});

class RecordsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      selectAll: false,
      selectedCount: 0
    };
  }

  handleSelect = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSelectEntries = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  renderSubItem(data) {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <div>
        {this.state.editMode && <Checkbox checked={false} />}
          <span className={classes.entryDescription}>{data.description}</span>
          <Tooltip title={data.workspace}>
            <Button color='secondary' className={classes.entryButton}>
              <FolderIcon />
            </Button>
          </Tooltip>
        </div>
        <div>
          <span className={classes.entryAttributes}>
            <Tooltip title="Select tags">
              <Button color='secondary'className={classes.entryButton}>
                {/* {data.tags} */}
                <LocalOfferIcon />
              </Button>
            </Tooltip>
          </span>
          <span className={classes.entryBeginEnd}>
            {`${data.start} - ${data.end}`}
          </span>
          <span className={classes.elapsedTime}>{`${data.totalTime}`}</span>
          <span className={classes.entryActions}>
            <Tooltip title='Continue time entry'>
              <Button color='secondary'className={classes.entryButton}>
                <PlayArrowIcon />
              </Button>
            </Tooltip>
            <Tooltip title="More actions">
              <Button color='secondary' className={classes.entryButton}>
                <MoreIcon />
              </Button>
            </Tooltip>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <div className={classes.grow}>
            {this.state.editMode && (
              <Checkbox
                checked={this.state.selectAll}
                onChange={this.handleSelect("selectAll")}
                value="selectAll"
              />
            )}
            <div>
              <span>{data.date}</span>
            </div>
            {this.state.editMode && (
              <div className={classes.selectionActions}>
                <span className={classes.selectionCounter}>{`${
                  this.state.selectedCount
                }/100 items selected`}</span>
                <Button color='secondary'>Bulk edit</Button>
                <Button color='secondary'>Delete</Button>
              </div>
            )}
          </div>
          <div className={classes.totalTime}>
            <Typography>{data.totalTime}</Typography>
          </div>
          <div>
            <Tooltip title="Select multiple entries" placement="top">
              <Button color='secondary' onClick={this.toggleEditMode}>
                <ListIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
        {data.records.map(data => this.renderSubItem(data))}
      </Paper>
    );
  }
}

export default withStyles(styles)(RecordsList);
