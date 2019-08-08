import React from 'react';
import moment from 'moment';
import {Bar, Doughnut} from 'react-chartjs-2';

//MUI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const testdata = {
	labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	datasets: [
		{
			label: "Training Time",
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data: [31,660,160,24,13,7,38],
		},
	],
};



const testoptions = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      gridLines: {
        display:false
      },
    }],
    yAxes: [{
      beginAtZero: true,
      ticks: {
        stepSize: 60,
        callback: (value) => {
          return Math.round(value/60)+' h';
        }
      }
    }],
  },
  tooltips: {
    callbacks: {
        title: function(tooltipItem, data){
          return data.labels[tooltipItem[0].index];
        },        
        label: function(tooltipItem, data){
          let label = 'Total: '
          //label += Math.round(tooltipItem.yLabel * 100) / 100;
          label += moment().hours(0).minutes(tooltipItem.yLabel).format("HH:mm");
          return label;
        }
      }
    }
    
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
});

const DashboardScreen = (props) => {
  const {classes} = props;
  return (
    <main>
      
      <Toolbar>
        <Typography variant="h5" className={classes.grow}>Dashboard</Typography>
        <Button variant="h5">This Week</Button>
        <Button variant="h5">Previous Week</Button>
        <Button variant="h5">Next Week</Button>
      </Toolbar>
      <Paper className={classes.root} elevation={1}>
        <Bar data={testdata} options={testoptions} width={600} height={120}/>
      </Paper>
      <Paper className={classes.root}>
        <Typography variant="h5">This week's resume:</Typography>
        <Doughnut data={testdata} width={600} height={120}/>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(DashboardScreen);