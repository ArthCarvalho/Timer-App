import React from 'react';

import RecordsList from '../../components/TimerScreen/RecordsList';

//MUI
import Typography from '@material-ui/core/Typography';


const ProjectDatabase = {
  current: {
    entries: [
      {
        date: 'Sun, 19th May',
        totalTime: '1:17:25',
        records: [
          {
            description: "Description Task 1",
            workspace: "Workspace1",
            tags: "Tag 1, Tag 2",
            start: "01:00:00 PM",
            end: "01:32:00 PM",
            totalTime: "00:32:00",
          }
        ],
      },
      {
        date: 'Sat, 18th May',
        totalTime: '0:34:42',
        records: [
          {
            description: "Description Task 2",
            workspace: "Workspace2",
            tags: "Tag 2, Tag 3",
            start: "02:00:00 PM",
            end: "04:00:00 PM",
            totalTime: "01:00:00",
          },
          {
            description: "Description Task 3",
            workspace: "Workspace3",
            tags: "Tag 4, Tag 5",
            start: "02:00:00 AM",
            end: "04:00:00 AM",
            totalTime: "01:00:00",
          },
        ],
      },
    ],
  },
};


class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      database: undefined,
    };
  }

  componentDidMount() {
    this.setState({database: ProjectDatabase})
  };

  renderDayRecords( data ) {
    return(
      <div>
        <RecordsList data={data}/>
      </div>
    );
  };

  render() {

    console.log(ProjectDatabase);

    return (
      <main>
        <Typography variant="h5">Today</Typography>
        { this.state.database && this.state.database.current.entries.map(data => this.renderDayRecords(data)) }
      </main>
    );
  };
};

export default TimerScreen;