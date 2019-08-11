import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import moment from "moment";
import { Bar, Doughnut } from "react-chartjs-2";

//MUI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

// Icons
import CalendarIcon from "@material-ui/icons/CalendarToday";

const testdata = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  datasets: [
    {
      label: "Training Time",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [31, 660, 160, 24, 13, 7, 38]
    }
  ]
};

const testoptions = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        beginAtZero: true,
        ticks: {
          stepSize: 60,
          callback: value => {
            return Math.round(value / 60) + " h";
          }
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      title: function(tooltipItem, data) {
        return data.labels[tooltipItem[0].index];
      },
      label: function(tooltipItem, data) {
        let label = "Total: ";
        //label += Math.round(tooltipItem.yLabel * 100) / 100;
        label += moment()
          .hours(0)
          .minutes(tooltipItem.yLabel)
          .format("HH:mm");
        return label;
      }
    }
  }
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
    display: 'flex'
    
  },

  topElements: {
    display: "flex"
  },

  weekSelector: {
    marginRight: '100px'
  }
});

const DashboardScreen = props => {
  const { classes } = props;
  return (
    // <main>
    //   <Toolbar>
    //     <Typography variant="h5" className={classes.grow}>
    //       <div>Dashboard</div>
    //       <div>
    //         <Typography>MOST TRACKED</Typography>
    //         <Paper>
    //           <div>Timer App: Client</div>
    //           <div>(no project)</div>
    //         </Paper>
    //       </div>
    //     </Typography>
    //   </Toolbar>
    //   {/* <Paper className={classes.root} elevation={1}> */}
    //   <Button variant="h5">This Week</Button>
    //   <div className={classes.topElements}>
    //     <div className={classes.root}>
    //       <Bar data={testdata} options={testoptions} width={600} height={120} />
    //     </div>
    //   </div>
    //   {/* </Paper> */}

    //   {/* <Paper className={classes.root}> */}
    //   <Typography variant="h5">This week's resume:</Typography>
    //   <Doughnut data={testdata} width={600} height={120} />
    //   {/* </Paper> */}
    // </main>
    <Fragment >
      <div className={classes.root}>
      <Paper elevation={1} className={classes.weekSele}>
        <Typography variant='h6'>
          <CalendarIcon/>
          This Week
        </Typography>
      </Paper>
      </div>
      <div >
        
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(DashboardScreen);
